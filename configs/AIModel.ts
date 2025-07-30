// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = 'gemini-2.0-flash';
const config = {}; // you can add temperature, maxOutputTokens, etc.

export async function AIModelResult(prompt: string): Promise<string> {
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';

  for await (const chunk of response) {
    if (chunk.text) {
      result += chunk.text;
    }
  }

  return result;
}

// // Example usage:
// (async () => {
//   const output = await AIModelResult("Write a haiku about coding in Next.js");
//   console.log("AI Output:", output);
// })();
