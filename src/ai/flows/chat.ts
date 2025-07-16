'use server';

/**
 * @fileOverview A conversational AI chatbot flow.
 *
 * - chat - A function that handles a single turn in a conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe('The AI-generated response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  system:
    'You are a helpful and friendly AI assistant on a Q&A platform for college students. Your name is CampusBot. Your goal is to provide clear, accurate, and helpful answers to student questions on a wide range of academic subjects.',
  prompt: `{{#each history}}
{{#if (eq role 'user')}}
User: {{{content}}}
{{else}}
AI: {{{content}}}
{{/if}}
{{/each}}

User: {{{message}}}
AI:`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const history = input.history.map(msg => ({
      role: msg.role,
      content: [{text: msg.content}],
    }));

    const {output} = await chatPrompt({
      ...input,
      history,
    });
    
    return {
      message: output!.message
    };
  }
);
