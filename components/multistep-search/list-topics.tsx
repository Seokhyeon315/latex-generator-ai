'use client';

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
    category: _category,
    field,
    topics,
    setLoading: _setLoading,
    setSelectedTopic,
    setSelectedField,
}) => {
    const handleTopicClick = async (topic: string) => {
        try {
            setSelectedTopic(topic);
            setSelectedField(field);
        } catch (error) {
            console.error('Error selecting topic:', error);
            toast.error('Failed to select topic. Please try again.');
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((topic, index) => (
                <div
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className="group glass-card p-4 cursor-pointer hover:shadow-medium transition-all duration-300 hover:scale-[1.02] animate-scale-in"
                    style={{animationDelay: `${index * 0.05}s`}}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-400 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                        <span className="text-primary-700 font-medium group-hover:text-accent-700 transition-colors duration-200">
                            {topic}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
