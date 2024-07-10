import { GoogleGenerativeAI } from "@google/generative-ai";
import { FormulaSearch } from "@/components/FormulaSearch";


export interface SearchPageProps extends React.ComponentProps<'div'> {
    id?: string
    input: string
}

export default async function SearchPage() {
    const genAI = new GoogleGenerativeAI(
        process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
    )

    return (
        <FormulaSearch />
    );
}