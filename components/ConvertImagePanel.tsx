'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { toast } from 'sonner';
import { useActions, useUIState } from 'ai/rsc';
import MarkdownRender from '@/components/markdown-render';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { Loading } from './loading';
import { AI } from '@/lib/actions';
import { EmptyConvertScreen } from './empty-convert-screen';

export default function ConvertPagePanel() {
    // State declarations
    const [results, setResults] = React.useState<string>('');
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [base64String, setBase64String] = React.useState<string>();

    // References
    const fileRef = React.useRef<HTMLInputElement>(null);

    // Get the action from useActions
    const { imageToLatexAction } = useActions();

    // Handle file change event
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            toast.error('No file selected');
            return;
        }

        const file = event.target.files[0];
        setFileName(file.name);

        // Check if the file type is an image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setBase64String(reader.result as string)
            };

        } else {
            toast.error('Invalid file type. Please attach an image file.');
        }
    };

    // Handle convert button click
    const handleConvert = async () => {
        if (!base64String) {
            toast.error('No image attached.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await imageToLatexAction(base64String);
            setResults(response.display);
        } catch (e) {
            setError('An unexpected error occurred. Please try again.');
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
                        />
                        <div className="flex items-center gap-4 bg-gray-100 px-4 py-3 rounded-lg">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => fileRef.current?.click()}
                                className="hover:bg-gray-200"
                            >
                                <Paperclip />
                            </Button>
                            <span className="text-gray-700">
                                {fileName ? `File "${fileName}" is attached.` : 'Click the icon to attach the image'}
                            </span>
                        </div>

                        <Button
                            variant="default"
                            onClick={handleConvert}
                            disabled={isLoading}
                            className="w-full py-3 bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
                        >
                            {isLoading ? 'Converting...' : 'Convert'}
                        </Button>
                    </form>

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
                    ) : (<EmptyConvertScreen />)}
                </div>
            </div>
        </div>
    );
}
