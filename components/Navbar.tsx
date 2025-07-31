'use client'

import * as React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { MobileNav } from '@/components/mobile-nav'
import { Search, Home, Info } from './ui/icons';

interface MenuItem {
    label: string;
    path: string;
    icon: React.ReactNode;
}

const menuitems: MenuItem[] = [
    {
        label: "Home",
        path: "/",
        icon: <Home size={18} />,
    },
    {
        label: "About",
        path: "/about",
        icon: <Info size={18} />,
    },
    {
        label: "Search",
        path: "/search",
        icon: <Search size={18} />,
    },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-surface-200/50 shadow-soft">
            <div className="container-fluid">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="group flex items-center gap-3 transition-all duration-200">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-large group-hover:scale-105 transition-all duration-200">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-2xl font-bold text-gradient group-hover:scale-105 transition-transform duration-200">
                                STEM Hub
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex lg:items-center lg:gap-2">
                        <ul className="flex items-center gap-1">
                            {menuitems.map((item, index) => {
                                const isActive = pathname === item.path || 
                                    (item.path !== '/' && pathname.startsWith(item.path));
                                
                                return (
                                    <li key={index}>
                                        <Link
                                            href={item.path}
                                            className={`
                                                group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200
                                                ${isActive 
                                                    ? 'bg-primary-50 text-primary-700 shadow-soft' 
                                                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                                                }
                                            `}
                                        >
                                            <span className={`
                                                transition-colors duration-200
                                                ${isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-600'}
                                            `}>
                                                {item.icon}
                                            </span>
                                            <span className="text-base font-medium">
                                                {item.label}
                                            </span>
                                            {isActive && (
                                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-scale-in"></div>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* CTA Button */}
                        <div className="ml-4 pl-4 border-l border-surface-200">
                            <Link href="/search/direct-search">
                                <button className="btn btn-primary px-4 py-2 text-sm h-auto group">
                                    Get Started
                                    <Search size={16} className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                                </button>
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}