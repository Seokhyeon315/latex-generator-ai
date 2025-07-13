'use server'

import { createAI } from 'ai/rsc';
import { directSearchAction } from './server-actions/direct-search';
import { submitInputAction } from './server-actions/submit-input';
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
export { directSearchAction, submitInputAction, getMoreFormulas };

export const AI = createAI<AIState, UIState>({
    actions: {
        directSearchAction,
        submitInputAction,
        getMoreFormulas,
    },
    initialUIState: [],
    initialAIState: { interactions: [], messages: [] },
});
