import { FileSpreadsheet, SearchCheck, SquareSigma } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <div className="container py-12 lg:py-18">
                <div className="max-w-2xl mx-auto">
                    <div className="grid gap-12">
                        <div>
                            <h2 className="text-3xl font-bold lg:text-4xl">The Vision</h2>
                            <p className="mt-2 text-base lg:text-lg">
                                Numerous principles and formulas discovered by humans throughout history have been written in paper books or stored online as digital data, and people who have studied the knowledge have an advantage in searching and accessing such formulas. However, because the human brain has limitations in remembering all the information, artificial intelligence has been rising technology to help humans.
                            </p>
                            <p className="mt-4 text-base lg:text-lg">
                                Although there are many equations or formulas other than mathematics and science, I wanted to focus on helping students and researchers in STEM( Science, Technology, Engineering, and Math ) fields. With a chance to participate in the &apos;Google Gemini API Competition&apos;, I wanted to build a website to provide services such as searching formulas, and getting LaTeX for equations easily, ultimately reducing the time used to search formulas and digitize these formulas.
                            </p>
                        </div>
                        <div className="space-y-6 lg:space-y-10">
                            <div className="flex">
                                <SearchCheck className="flex-shrink-0 mt-2 h-6 w-6" />
                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-base sm:text-lg font-semibold">
                                        Easy and quick Search Functionality
                                    </h3>
                                    <p className="mt-1 text-muted-foreground">
                                        With the power of Google Gemini API, you will get the most accurate search results for your formulas.
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <SquareSigma className="flex-shrink-0 mt-2 h-6 w-6" />
                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-base sm:text-lg font-semibold">
                                        LATEX format for students and researchers
                                    </h3>
                                    <p className="mt-1 text-muted-foreground">
                                        You will save a lot of time to use this website instead of typing long equations in LATEX format manually.
                                    </p>
                                </div>
                            </div>
                            {/* End Icon Block */}
                            {/* Icon Block */}
                            <div className="flex">
                                <FileSpreadsheet className="flex-shrink-0 mt-2 h-6 w-6" />
                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-base sm:text-lg font-semibold">
                                        Convert handwritten formulas to Latex format
                                    </h3>
                                    <p className="mt-1 text-muted-foreground">
                                        Just attach the image of the handwritten formula, and you will get the LATEX format of the formula quickly. The image you attach won&apos;t be stored in the server.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
