'use client'


import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";


export function SubmitButton() {
    const { pending } = useFormStatus();
    console.log(pending);

    return (
        <Button size={"icon"} type='submit' disabled={pending}>
            <SearchIcon />
        </Button>
    );
}