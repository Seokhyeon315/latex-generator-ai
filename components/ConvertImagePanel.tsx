'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { toast } from 'sonner';
import { useActions, useUIState } from 'ai/rsc';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { Loading } from './loading';
import { validateAndCompressImage, convertToBase64, ACCEPTED_IMAGE_TYPES } from '@/lib/utils/image-handler';
import Image from 'next/image';
import { ERROR_MESSAGES, LOADING_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants/errors';
import dynamic from 'next/dynamic';

const MarkdownRender = dynamic(() => import('@/components/markdown-render'), {
    loading: () => <Loading isLoading={true} />,
    ssr: false
});

const DynamicEmptyScreen = dynamic(() => import('./empty-convert-screen').then(mod => ({
    default: mod.EmptyConvertScreen
})), {
    loading: () => <Loading isLoading={true} />,
    ssr: false
});

export default function ConvertPagePanel() {
    // State declarations
    const [results, setResults] = React.useState<string>('');
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [base64String, setBase64String] = React.useState<string>();
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [processingStep, setProcessingStep] = React.useState<string>('');

    // References
    const fileRef = React.useRef<HTMLInputElement>(null);

    // Get the action from useActions
    const { imageToLatexAction } = useActions();

    // Handle file change event
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            toast.error(ERROR_MESSAGES.IMAGE.NO_FILE);
            return;
        }

        const file = event.target.files[0];
        setFileName(file.name);

        try {
            setProcessingStep(LOADING_MESSAGES.PROCESSING);

            // Validate and compress image
            const validationResult = await validateAndCompressImage(file);

            if (!validationResult.isValid) {
                toast.error(validationResult.error);
                return;
            }

            const processedFile = validationResult.compressedFile!;
            if (validationResult.wasCompressed) {
                toast.success(SUCCESS_MESSAGES.COMPRESSION);
            }

            // Create preview URL
            const previewUrl = URL.createObjectURL(processedFile);
            setPreviewUrl(previewUrl);

            setProcessingStep(LOADING_MESSAGES.CONVERTING);
            // Convert to base64
            const base64 = await convertToBase64(processedFile);
            setBase64String(base64);

        } catch (error) {
            console.error('Image processing error:', error);
            toast.error(ERROR_MESSAGES.IMAGE.PROCESSING_ERROR);
        } finally {
            setProcessingStep('');
        }
    };

    // Cleanup preview URL on unmount
    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Handle convert button click
    const handleConvert = async () => {
        if (!base64String) {
            toast.error(ERROR_MESSAGES.IMAGE.NO_IMAGE);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await imageToLatexAction(base64String);
            if (!response || !response.display) {
                throw new Error('Invalid response');
            }
            setResults(response.display);
            toast.success(SUCCESS_MESSAGES.CONVERSION);
        } catch (e) {
            console.error('Conversion error:', e);
            setError(
                e instanceof Error && e.message === 'Network Error'
                    ? ERROR_MESSAGES.IMAGE.NETWORK_ERROR
                    : ERROR_MESSAGES.IMAGE.CONVERSION_ERROR
            );
            toast.error(error || ERROR_MESSAGES.IMAGE.CONVERSION_ERROR);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center py-12 lg:py-18 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full mx-auto p-8 sm:p-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Convert Image to LaTeX Code
                </h1>
                <p className="text-lg text-gray-600 text-center mb-8">
                    Upload your handwritten equations to get a digital LaTeX version!
                </p>
                <div className="space-y-6">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setResults('');
                        if (!results) return;
                    }} className="space-y-4">
                        <input
                            type="file"
                            className="hidden"
                            id="file"
                            ref={fileRef}
                            onChange={handleFileChange}
                            accept={Object.keys(ACCEPTED_IMAGE_TYPES).join(',')}
                        />
                        <div className="flex items-center gap-4 bg-gray-100 px-4 py-3 rounded-lg">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => fileRef.current?.click()}
                                className="hover:bg-gray-200"
                                name='Image attach button'
                            >
                                <Paperclip />
                            </Button>
                            <span className="text-gray-700">
                                {fileName ? `File "${fileName}" is attached.` : 'Click the icon to attach the image'}
                            </span>
                        </div>

                        {previewUrl && (
                            <div className="mt-4 relative w-full aspect-video">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                        )}

                        <Button
                            variant="default"
                            onClick={handleConvert}
                            disabled={isLoading}
                            className="w-full py-3 bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
                        >
                            {isLoading ? 'Converting...' : 'Convert'}
                        </Button>
                    </form>

                    {processingStep && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <div className="text-white flex flex-col items-center gap-2">
                                <Loading isLoading={true} />
                                <p>{processingStep}</p>
                            </div>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex items-center justify-center mt-2">
                            <Loading isLoading={isLoading} />
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center mt-6 text-red-500">
                            {error}
                        </div>
                    ) : results.length > 0 ? (
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conversion Result:</h2>
                            <div className="relative overflow-x-hidden bg-gray-50 p-4 rounded-lg">
                                <CopyToClipboard text={results} className="absolute top-2 right-2 border border-gray-600 p-2 rounded" />
                                <pre className="whitespace-pre-wrap mt-8 text-gray-700">
                                    <MarkdownRender content={results} />
                                </pre>
                            </div>
                        </div>
                    ) : (<DynamicEmptyScreen />)}
                </div>
            </div>
        </div>
    );
}
