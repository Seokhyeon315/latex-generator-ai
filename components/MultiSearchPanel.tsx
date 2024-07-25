'use client';

import type { AI } from '@/lib/actions'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { Card } from './ui/card';

export interface SearchPanelProps extends React.ComponentProps<'div'> {
    id?: string
}

export function MultiStepSearchPanel({ id }: SearchPanelProps) {
    const [aiState] = useAIState()
    const [messages, setMessages] = useUIState<typeof AI>()


    const exampleMessages = []

    return (
        <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="mb-4 grid sm:grid-cols-2 gap-2 sm:gap-4 px-4 sm:px-0">
                <div className='grid gap-3'>
                    search panel to narrow down

                </div>

            </div>
        </div>
    );
}
