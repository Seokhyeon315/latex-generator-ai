'use client';

import React, { useState } from 'react';
import { IconCheck, IconCopy } from './ui/icons';
import { toast } from 'sonner'

export function CopyToClipboard({ text }: { text: string }) {
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
            className="ml-4"
        >
            {isCopied ? <IconCheck /> : <IconCopy />}
        </button>
    );
}
