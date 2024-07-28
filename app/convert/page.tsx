// Server component for the convert page


import ConvertPagePanel from '@/components/ConvertImagePanel';
import { AI } from '@/lib/actions';
import * as React from 'react'


export const metadata = {
    title: 'Convert Formula'
}


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
