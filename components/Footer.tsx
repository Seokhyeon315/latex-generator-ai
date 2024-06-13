'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';


export default function Footer() {
    const [scrolled, setScrolled] = React.useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0; // Adjust the value based on when you want the footer to appear
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount


    return (<>
        <footer className={`flex flex-row p-4 ${scrolled ? 'visible' : 'hidden'}`}>
            <div className="flex-1 text-center py-2">
                <p className="text-sm">&copy; 2024. <Link href="https://www.seokhyeonbyun.com/" className='hover:underline'>Seokhyeon Byun</Link>. All rights reserved.</p>
            </div>
        </footer>
    </>)
}

