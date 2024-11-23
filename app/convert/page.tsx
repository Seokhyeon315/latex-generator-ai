// Server component for the convert page


import ConvertPagePanel from '@/components/ConvertImagePanel';
import { AI } from '@/lib/actions';
import type { Metadata } from 'next';
import * as React from 'react'


export const metadata: Metadata = {
    title: "Convert Formula | STEM Hub",
    description: "Convert page allows users to attach the image of their handwritten equations, or formula and returns the copyable LaTex code using Google Gemini API.",
};

export default function ConvertPage() {


    return (
        <AI>
            <div className="group w-full overflow-auto">
                {/* Empty screen here includes title, instructions, examples */}
                <ConvertPagePanel />
            </div>
        </AI>
    );
}
