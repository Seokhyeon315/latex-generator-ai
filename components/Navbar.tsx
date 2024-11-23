'use client'

import * as React from 'react'
import Link from "next/link";
import { MobileNav } from '@/components/mobile-nav'
import { Badge } from "@/components/ui/badge"


interface menuItemProps {
    label: string;
    path: string;
    badge?: React.ReactNode;
}[]

const menuitems = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "About",
        path: "/about",
    },
    {
        label: "Search",
        path: "/search",
    },
    {
        label: "Convert",
        path: "/convert",
        badge: <Badge className="text-[10px]">Experimental</Badge>

    },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex justify-between w-full h-16 px-4 lg:px-16 lg:mt-2 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
            <div className="flex items-center">
                <Link href="/" className="text-2xl pl-2 lg:pl-6"
                >
                    <span className="font-bold text-slate-800">STEM Hub</span>
                </Link>
            </div>

            {/* For larger screen */}
            <nav className="hidden lg:flex lg:items-center lg:justify-end lg:gap-2 lg:pr-8">
                <ul className="flex flex-col lg:flex-row lg:gap-3">
                    {
                        menuitems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className="flex lg:px-3 py-2 items-center font-semibold text-gray-900">
                                    <span className="hover:underline hover:underline-offset-2 text-lg"> {item.label}</span>
                                    <div className="ml-2 text-xs">{item.badge}</div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className="block mt-3 lg:hidden">
                <MobileNav />
            </div>
        </header>

    )
}