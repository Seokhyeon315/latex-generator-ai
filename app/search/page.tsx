// Server component for the search page

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { searchFormulaAction } from "@/lib/actions";


export interface SearchPageProps extends React.ComponentProps<'div'> {
    id?: string
    input: string
}

export default function SearchPage() {
    return (
        // This will be enveloped in AIProvider defined in actions.tsx
        <div className="flex min-h-screen flex-col items-center">
            <div className="relative overflow-hidden">
                <div className="container py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Formula Search
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Search the formula name or upload image of equations to get Latex form quickly!
                        </p>
                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            <form action={searchFormulaAction}
                            >
                                <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                                    <div className="flex-[1_0_0%]">
                                        <Label htmlFor="formula" className="sr-only">
                                            Search a formula
                                        </Label>
                                        <Input
                                            type="text"
                                            name="search"
                                            className="h-full"
                                            id="search"
                                            placeholder="Search here"
                                            required
                                            autoComplete="off"
                                            autoCorrect="off"
                                        />
                                    </div>
                                    <div className="flex-[0_0_auto]">
                                        <Button size={"icon"} type='submit'>
                                            <SearchIcon />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Output Display panel */}

        </div>
    );
}
