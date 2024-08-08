'use client'

import { useUIState, useActions } from 'ai/rsc';
import { toast } from 'sonner';

interface ListTopicsProps {
    category: string;
    field: string;
    topics: string[];
    setLoading: (loading: boolean) => void;
    setSelectedTopic: (topic: string) => void;
    setSelectedField: (field: string) => void;
}

export const ListTopics: React.FC<ListTopicsProps> = ({
    category,
    field,
    topics,
    setLoading,
    setSelectedTopic,
    setSelectedField,
}) => {
    const { submitInputAction } = useActions();
    const [_, setMessages] = useUIState();

    const handleTopicClick = async (topic: string) => {
        setLoading(true);
        setSelectedTopic(topic); // Set the selected topic
        setSelectedField(field); // Set the selected field
        try {
            const { formulas } = await submitInputAction(
                `Give me the list of 5 formulas, equations, or theorems based on ${topic}, ${field}, in the category of ${category}.`
            );

            // Add received formulas to the message state
            setMessages((currentMessages: any) => [
                ...currentMessages,
                ...formulas.map((formula: any) => ({
                    name: formula.name,
                    description: formula.description,
                    latexCode: formula.latexCode,
                }))
            ]);
        } catch (error) {
            console.log(error);
            toast.error('There was an error on multi-step search. Please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 transition-all duration-300 ease-in-out">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Topics
            </span>
            <div className="mt-2 space-y-2">
                {topics.map((topic, index) => (
                    <div
                        onClick={() => handleTopicClick(topic)}
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 transition-transform duration-200 hover:shadow-lg hover:scale-105"
                    >
                        <span className="text-gray-800 font-medium">{topic}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
