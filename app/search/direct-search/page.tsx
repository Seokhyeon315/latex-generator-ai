import { AI } from "@/lib/actions";
import React from "react";
import { DirectSearchPanel } from '@/components/DirectSearchPanel';


export default function DirectSearchPage() {
    return (
        <AI>
            <div className="group w-full overflow-auto">
                {/* Empty screen here includes title, instructions, examples */}
                <DirectSearchPanel />
            </div>
        </AI>
    );
}