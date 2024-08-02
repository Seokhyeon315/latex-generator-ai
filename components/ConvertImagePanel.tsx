'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { toast } from 'sonner';
import { useActions } from 'ai/rsc';
import MarkdownRender from '@/components/markdown-render';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { Loading } from './loading';

export default function ConvertPagePanel() {
    // State declarations
    const [results, setResults] = React.useState<string>('');
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [base64String, setBase64String] = React.useState<string | null>(null);

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
            reader.onloadend = () => {
                setBase64String(reader.result as string);
            };
            reader.readAsDataURL(file);
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
            console.error(e);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-12 lg:py-18">
            <div className="mx-auto sm:max-w-2xl sm:px-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Convert Image to LaTeX code
                </h1>
                <p className="mt-3 text-xl text-muted-foreground">
                    Attach your handwritten equations and get digitalized version with LaTeX code!
                </p>
                <div className="grid gap-4 sm:pb-4">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setResults('')
                        if (!results) return;
                    }}>
                        <input
                            type="file"
                            className="hidden"
                            id="file"
                            ref={fileRef}
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-row gap-4 bg-gray-50 px-4 py-2 rounded-full">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => fileRef.current?.click()}
                            >
                                <Paperclip />
                            </Button>
                            <p className="p-2">Click the icon to attach the image</p>
                            {fileName && (
                                <p className="p-2 underline">File "{fileName}" is attached.</p>
                            )}
                        </div>
                        <p className='my-2'>For the best result, the image should contain neat handwriting if possible.</p>
                        <Button
                            variant="default"
                            onClick={handleConvert}
                            disabled={isLoading}
                            className='text-lg'
                        >
                            Convert
                        </Button>
                    </form>

                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loading isLoading={isLoading} />
                        </div>) : error ? (
                            <div className="flex h-fit items-center justify-center mt-4 pb-6 text-red-500">
                                {error}
                            </div>
                        ) : results.length > 0 ? (
                            <div>
                                {/* Ouput display */}
                                {results && (
                                    <div className="mt-4">
                                        <h2 className="text-2xl font-semibold">Conversion Result:</h2>
                                        <div className="relative mt-2 p-4 bg-gray-100 rounded-lg">
                                            {/* Positioned copy button at the top right */}
                                            <div className="absolute top-0 right-0 m-2 text-lg">
                                                <CopyToClipboard text={results} />
                                            </div>
                                            <pre className="whitespace-pre-wrap mt-8">
                                                <MarkdownRender content={results} />
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (null)
                    }

                </div>
            </div>
        </div>
    );
}
