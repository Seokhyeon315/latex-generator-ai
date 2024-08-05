import { MultiStepSearchPanel } from '@/components/multistep-search/MultiSearchPanel';
import { AI } from "@/lib/actions";
import React from "react";


export default function MultiStepSearchPage() {
    return (
        <AI >
            <MultiStepSearchPanel />
        </AI >
    );
}