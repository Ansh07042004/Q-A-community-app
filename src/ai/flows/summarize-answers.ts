'use server';

/**
 * @fileOverview This file defines a Genkit flow to summarize multiple answers to a question using generative AI.
 *
 * - summarizeAnswers - A function that takes a question and an array of answers and returns a summarized response.
 * - SummarizeAnswersInput - The input type for the summarizeAnswers function.
 * - SummarizeAnswersOutput - The return type for the summarizeAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAnswersInputSchema = z.object({
  question: z.string().describe('The question being answered.'),
  answers: z.array(z.string()).describe('An array of answers to the question.'),
});
export type SummarizeAnswersInput = z.infer<typeof SummarizeAnswersInputSchema>;

const SummarizeAnswersOutputSchema = z.object({
  summary: z.string().describe('A summarized response generated from the provided answers.'),
});
export type SummarizeAnswersOutput = z.infer<typeof SummarizeAnswersOutputSchema>;

export async function summarizeAnswers(input: SummarizeAnswersInput): Promise<SummarizeAnswersOutput> {
  return summarizeAnswersFlow(input);
}

const summarizeAnswersPrompt = ai.definePrompt({
  name: 'summarizeAnswersPrompt',
  input: {schema: SummarizeAnswersInputSchema},
  output: {schema: SummarizeAnswersOutputSchema},
  prompt: `You are an AI expert in summarizing information. Please summarize the following answers to the question: {{{question}}}.\n\nAnswers:\n{{#each answers}}- {{{this}}}\n{{/each}}\n\nSummary: `,
});

const summarizeAnswersFlow = ai.defineFlow(
  {
    name: 'summarizeAnswersFlow',
    inputSchema: SummarizeAnswersInputSchema,
    outputSchema: SummarizeAnswersOutputSchema,
  },
  async input => {
    const {output} = await summarizeAnswersPrompt(input);
    return output!;
  }
);
