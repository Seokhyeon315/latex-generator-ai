'use client'

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-gray-50/80 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <p className="text-sm text-gray-600">
                        © {currentYear} STEM Hub. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-600">
                        Designed and developed by{' '}
                        <Link
                            href="https://www.seokhyeonbyun.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-900 hover:underline transition-colors"
                        >
                            Seokhyeon Byun
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}

