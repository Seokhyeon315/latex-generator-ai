'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { getMutableAIState } from 'ai/rsc';
import { z } from 'zod';

export async function submitInputAction(content: string) {
    const history = getMutableAIState();

    try {
        // ... implementation
    } catch (error) {
        // ... error handling
    }
} 