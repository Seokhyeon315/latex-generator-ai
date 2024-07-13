'use client'

import React, { FormEvent } from 'react';
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'


import { useActions, useUIState } from 'ai/rsc'
import { Paperclip } from 'lucide-react';

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
    // actions defined in lib/actions.tsx are used in useActions()
    // const { } = useActions()
    return (
        <form
            ref={formRef}
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                // Do something
                const value = input.trim()
                setInput('')
                if (!value) return
            }}>
            <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                {/* Image upload icon */}
                <div className='flex items-center hover:text-gray-500'>
                    <Paperclip />
                </div>

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
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                    />
                </div>
                <div className="flex-[0_0_auto]">
                    <SubmitButton />
                </div>
            </div>

        </form>
    )
}