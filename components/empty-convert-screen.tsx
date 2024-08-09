import React from 'react';

export function EmptyConvertScreen() {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg text-base">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    Instructions
                </h1>
                <p className="text-sm text-gray-500 italic">
                    Tip: For optimal results, ensure the image features neat handwriting. Supported image formats include PNG, JPG, and JPEG.
                    <span className="text-red-500 pl-2">Please note: This feature has some limitations. For example, processing screenshots or images of handwritten equations on paper may lead to errors.</span>
                </p>

                <div className="leading-relaxed text-gray-700">
                    <div className="bg-gray-50 p-5 rounded-lg mb-4">
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Ensure that the handwritten note is clear and legible.</li>
                            <li>Take a screenshot of the note.</li>
                            <li>Upload the screenshot image.</li>
                            <li>Click the "Convert" button to quickly digitize your handwritten note.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
