import 'server-only'


import { GoogleGenerativeAI } from '@google/generative-ai'
import { revalidatePath } from "next/cache";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

// If I use Vercel AI SDK, I want to recieve the object of the response including
// 1. Rendered form of equation, copyable to clipboard
// 2. Latex form of equation, copyable to clipboard
// 3. Explanation of the equation
// 4. Use case of the equation