// Server component for the convert page

import { Paperclip } from "lucide-react";



export default function ConvertPage() {
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
                    <form action=""
                    >
                        {/* Image upload icon */}
                        <div className="flex flex-row items-center justify-center">
                            <button>
                                <Paperclip />
                            </button>

                            <div className="p-2">Click the icon or Attach image below</div>
                            {/* When click this icon, the ImageUpload panel will show up below the search input */}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
