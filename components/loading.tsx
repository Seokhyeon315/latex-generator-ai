import React from "react"
import { SpinnerIcon } from '@/components/ui/icons'

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div className="flex flex-col gap-2">
            <div
                className={`flex flex-row gap-2 items-center ${isLoading ? 'opacity-100' : 'opacity-0'}`}
            >
                <SpinnerIcon />
                <div className="text-zinc-500 text-sm">Analyzing video...</div>
            </div>
        </div>
    )
}