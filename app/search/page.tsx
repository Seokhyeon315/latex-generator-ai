// This server component will call api to generate the latex code and display the result

import FormulaFinderForm from "@/components/FormulaFinderForm";

export default function FinderPage() {

    return (
        <div className="flex min-h-screen flex-col items-center">
            <FormulaFinderForm />
        </div>
    )
}