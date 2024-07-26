import { AI } from "@/lib/actions";
import React from "react";
import { DirectSearchForm } from '@/components/direct-search-form';


export default function DirectSearchPage() {
    return (
        <AI>
            <div className="group w-full overflow-auto">
                <div className="flex flex-col items-center ">
                    <h1 className="text-3xl font-semibold">Direct Search</h1>

                </div>
                <DirectSearchForm />

            </div>

        </AI>
    );
}