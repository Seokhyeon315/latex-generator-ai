import { Formula } from '@/lib/types';
import { PaperReferences } from '../PaperReferences';
import { FormulaRenderer } from '../FormulaRenderer';
import { CopyToClipboard } from '../copy-to-clipboard';

interface AcademicReference {
    title: string;
    authors: string;
    year: string;
    significance: string;
}

interface FormulaWithReferences extends Formula {
    academicReferences?: AcademicReference[];
    explanation?: string;
}

export function Output({ formula }: { formula: FormulaWithReferences }) {
    return (
        <div className="space-y-6">
            {/* Formula Name */}
            <h2 className="text-2xl font-bold">{formula.formulaName}</h2>

            {/* Description */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{formula.description}</p>
            </div>

            {/* Formula Display */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Formula</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <FormulaRenderer formula={formula.latexCode} />
                </div>
            </div>

            {/* Usage */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Usage</h3>
                <p className="text-gray-700">{formula.usage}</p>
            </div>

            {/* Explanation if available */}
            {formula.explanation && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Explanation</h3>
                    <p className="text-gray-700">{formula.explanation}</p>
                </div>
            )}

            {/* LaTeX Code */}
            <div className="relative">
                <h3 className="text-lg font-semibold mb-2">LaTeX Code</h3>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm relative group">
                    <code>{formula.latexCode.replace(/\$\$/g, '')}</code>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyToClipboard text={formula.latexCode} />
                    </div>
                </div>
            </div>

            {/* Academic References */}
            {formula.academicReferences && formula.academicReferences.length > 0 && (
                <PaperReferences
                    papers={formula.academicReferences.map((ref: AcademicReference) => ({
                        title: ref.title,
                        authors: ref.authors.split(', '),
                        year: parseInt(ref.year),
                        significance: ref.significance,
                        link: '#'
                    }))}
                />
            )}
        </div>
    );
} 