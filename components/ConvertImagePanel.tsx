'use client'


import * as React from 'react'
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { toast } from 'sonner';


export default function ConvertPagePanel() {

    const fileRef = React.useRef<HTMLInputElement>(null)
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
                    <form
                        onSubmit={() => { }}
                    >

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
            </div >
        </div >

    );
}
