'use client'


import * as React from 'react'
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { toast } from 'sonner';
import { useActions, useUIState } from 'ai/rsc';
import { type AI } from '@/lib/actions'


export default function ConvertPagePanel() {
    const fileRef = React.useRef<HTMLInputElement>(null)
    const { imageToLatexAction } = useActions()
    const [latexCode, setLatexCode] = useUIState<typeof AI>()


    return (
        // This will be enveloped in AIProvider defined in actions.tsx

        <div className="container py-12 lg:py-18">
            <div className="text-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Convert Image to Latex code
                </h1>
                <p className="mt-3 text-xl text-muted-foreground">
                    Attach your handwritten formulas to get Latex code quickly!
                </p>
                <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                    <form>
                        <input
                            type="file"
                            className="hidden"
                            id="file"
                            ref={fileRef}
                            onChange={async event => {
                                if (!event.target.files) {
                                    toast.error('No file selected')
                                    return
                                }

                                const file = event.target.files[0]
                                if (file.type.startsWith('video/')) {
                                    // Show Invalid file type
                                } else {
                                    const reader = new FileReader()
                                    reader.readAsDataURL(file)
                                    reader.onloadend = async () => {
                                        const base64String = reader.result
                                        // Call server action
                                        const response = await imageToLatexAction(base64String)

                                        if (response.error) {
                                            toast.error(response.error)
                                        } else {
                                            setLatexCode(currentLatex => [
                                                ...currentLatex,
                                                response
                                            ])
                                        }

                                    }

                                }


                            }}
                        />

                        <div className="flex flex-row items-center justify-center" >
                            <Button
                                variant="outline"
                                size="icon"
                                className=""
                                onClick={() => {
                                    fileRef.current?.click()
                                }}>
                                <Paperclip />
                            </Button>

                            <p className="p-2">Click the icon to attach the image</p>
                        </div>
                    </form>
                </div>

                {/* Latex code output display below */}
                {latexCode && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold">Latex code:</h2>
                        <div className="mt-4">
                            {latexCode.map((code, index) => (
                                <div key={index}>
                                    <p className="text-lg">{code.display}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div >
        </div >

    );
}
