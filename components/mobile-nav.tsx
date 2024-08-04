'use client'

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";

interface MobileLinkProps extends LinkProps {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    className?: string;
    href: string;
}

export const MobileNav = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-10 px-0 lg:hidden" >
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="right">
                {/* Logo here */}

                <div className="flex flex-col pb-2 pl-3 gap-4 mt-7 pt-4 text-xl">
                    <MobileLink
                        onOpenChange={setOpen}
                        href="/"
                        className="flex items-center hover:underline"
                    >
                        Home
                    </MobileLink>
                    <MobileLink
                        onOpenChange={setOpen}
                        href="/about"
                        className="flex items-center hover:underline"
                    >
                        About
                    </MobileLink>
                    <MobileLink
                        onOpenChange={setOpen}
                        href="/search"
                        className="flex items-center hover:underline"
                    >
                        Search
                    </MobileLink>
                    <MobileLink
                        onOpenChange={setOpen}
                        href="/convert"
                        className="flex items-center hover:underline"
                    >
                        Convert
                    </MobileLink>

                </div>
            </SheetContent>

        </Sheet>


    );
};


function MobileLink({
    href,
    onOpenChange,
    children,
    className,
    ...props
}: MobileLinkProps) {
    const router = useRouter();

    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}


