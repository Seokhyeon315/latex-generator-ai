
import { FormulaSearch } from "@/components/FormulaSearch";


export interface SearchPageProps extends React.ComponentProps<'div'> {
    id?: string
    input: string
}

export default async function SearchPage() {


    return (
        // This will be envelped in AIProvider defined in actions.tsx
        <FormulaSearch />
    );
}