'use client'

import Link from "next/link";
import { MobileNav } from '@/components/mobile-nav'

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
    },
];

export function Navbar() {
    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <header className="flex flex-col md:flex-row justify-between items-center my-5">
                <div className="flex w-full lg:w-auto items-center justify-between">
                    <a href="/" className="text-2xl"
                    >
                        <span className="font-bold text-slate-800">Pro</span>
                        <span className="pl-1 text-slate-500">Formula</span>
                    </a>
                    <div className="block lg:hidden">
                        <MobileNav />
                    </div>
                </div>

                {/* For larger screen */}
                <nav className="hidden w-full lg:w-auto lg-2 lg:flex lg:mt-0">
                    <ul className="flex flex-col lg:flex-row lg:gap-3">
                        {
                            menuitems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        className="flex lg:px-3 py-2 items-center text-base font-semibold text-gray-900">
                                        <span className="hover:underline hover:underline-offset-2"> {item.label}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </header>
        </div>

    )
}