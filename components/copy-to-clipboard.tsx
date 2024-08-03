'use client';

import React, { useState } from 'react';
import { IconCheck, IconCopy } from './ui/icons';
import { toast } from 'sonner'
import { cn } from '@/lib/utils';

interface Props {
    text: string;
    className?: string;
}

export function CopyToClipboard({ text, className }: Props) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            onClick={() => {
                copyToClipboard(text);
                toast.success('Copied to clipboard');
            }}
            className={cn(className, 'ml-4')}
        >
            {isCopied ? <IconCheck /> : <IconCopy />}
        </button>
    );
}
