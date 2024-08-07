import { Search } from '@/components/search'
import { nanoid } from "@/lib/utils";
import React from "react";

export const metadata = {
    title: 'Formula Search'
}

export default function SearchPage() {
    const id = nanoid()


    return (
        <Search id={id} />
    );
}
