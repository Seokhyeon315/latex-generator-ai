
import React from 'react';

interface LoadingProps {
    isLoading: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Loading = ({ isLoading, size = 'md', className = '' }: LoadingProps) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    };

    if (!isLoading) return null;

    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
            {/* Animated spinner */}
            <div className={`${sizeClasses[size]} relative`}>
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>

            {/* Animated text */}
            <div className="flex items-center gap-1 text-gray-600">
                <span className="text-lg font-medium">Searching</span>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};
