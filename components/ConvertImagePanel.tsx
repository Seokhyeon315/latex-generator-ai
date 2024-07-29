'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { toast } from 'sonner';
import { useActions, useUIState } from 'ai/rsc';
import { type AI } from '@/lib/actions';
import { FormulaRenderer } from '@/components/FormulaRenderer';
import MarkdownRender from '@/components/markdown-render';
import { CopyToClipboard } from './copy-to-clipboard';

export default function ConvertPagePanel() {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const { imageToLatexAction } = useActions();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [latexCode, setLatexCode] = useUIState<typeof AI>();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            toast.error('No file selected');
            return;
        }

        const file = files[0];
        console.log('Selected file:', file); // Added log

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64String = reader.result;
                console.log('Base64 String:', base64String); // Added log
                // Call server action
                const response = await imageToLatexAction(base64String);

                if (response.error) {
                    toast.error(response.error);
                } else {
                    console.log('Server response:', response); // Added log
                    setLatexCode(currentLatex => [
                        ...currentLatex,
                        response
                    ]);
                }
            };
        } else {
            toast.error('Invalid file type');
        }
    };

    return (
        <div className="container py-12 lg:py-18">
            <div className="text-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Convert Image to Latex code
                </h1>
                <p className="mt-3 text-xl text-muted-foreground">
                    Attach your handwritten formulas to get Latex code quickly!
                </p>
                <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="file"
                            className="hidden"
                            id="file"
                            ref={fileRef}
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => fileRef.current?.click()}
                            >
                                <Paperclip />
                            </Button>
                            <p className="p-2">Click the icon to attach the image</p>
                        </div>
                    </form>
                </div>

                {/* Latex code output display below */}
                {latexCode && (
                    <div className="mt-12">
                        <div className="mt-4 grid grid-col-1 gap-4">
                            {latexCode.map((code, index) => (
                                <div key={index} className='flex flex-col items-center gap-4'>
                                    <FormulaRenderer formula={String(code.display)} className="border p-2 " />

                                    <div className='mt-4 gap-2 max-w-sm block rounded bg-black text-white px-2 py-1'>
                                        <span>Copy the Latex code</span>
                                        <CopyToClipboard text={String(code.display)} />
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
