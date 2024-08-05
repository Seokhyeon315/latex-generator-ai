'use client'

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 100); // Adjust the value as needed
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`${isVisible ? 'visible' : 'invisible'
                } fixed bottom-8 right-8 p-2 bg-black text-white dark:bg-slate-100 dark:text-black rounded-full transition-opacity duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300`}
        >
            <ArrowUp className="h-6 w-6" />
        </button>
    );
};

