'use client'

import React, { FormEvent } from 'react';
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'


export function SearchForm({
    id,
    input,
    setInput
}: {
    id?: string
    input: string
    setInput: (input: string) => void
}) {
    const { formRef, onKeyDown } = useEnterSubmit()
    return (
        <form
            ref={formRef}
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                // Do something
            }}>
            <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                <div className="flex-[1_0_0%]">
                    <Label htmlFor="formula" className="sr-only">
                        Search a formula
                    </Label>
                    <Input
                        type="text"
                        name="search"
                        className="h-full"
                        id="search"
                        placeholder="Search here"
                        required
                    />
                </div>
                <div className="flex-[0_0_auto]">
                    <SubmitButton />
                </div>
            </div>

        </form>
    )
}