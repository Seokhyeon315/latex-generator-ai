export function logApiError(error: any, context: string) {
    console.error(`[${context}] API Error:`, {
        message: error.message,
        type: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString()
    });
} 