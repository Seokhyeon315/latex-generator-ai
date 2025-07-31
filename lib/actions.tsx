'use server'

import { createAI } from 'ai/rsc';
import { directSearchAction } from './server-actions/direct-search';
import { getMoreFormulas } from './server-actions/multistep-search';

export type Message = {
    role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
    content: string
    id?: string
    name?: string
    display?: {
        name: string
        props: Record<string, any>
    }
}

export type AIState = {
    id?: string;
    interactions?: string[];
    content?: string;
    messages: Message[]
};

export type UIState = {
    id?: string;
    display: React.ReactNode;
}[];

// Export the server actions directly
export { directSearchAction, getMoreFormulas };

export const AI = createAI<AIState, UIState>({
    actions: {
        directSearchAction,
        getMoreFormulas,
    },
    initialUIState: [],
    initialAIState: { interactions: [], messages: [] },
});
