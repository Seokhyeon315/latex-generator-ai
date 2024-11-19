'use client';

import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";

interface ErrorStateProps {
    onRetry?: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
    return (
        <Button
            onClick={onRetry}
            className="flex items-center gap-2"
            variant="outline"
        >
            <RefreshCw className="h-4 w-4" />
            Try Again
        </Button>
    );
} 