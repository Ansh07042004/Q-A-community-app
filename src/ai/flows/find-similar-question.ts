'use server';

/**
 * @fileOverview This file defines a Genkit flow to find similar existing questions.
 *
 * - findSimilarQuestion - A function that takes a new question and returns a similar one if it exists.
 * - FindSimilarQuestionInput - The input type for the findSimilarQuestion function.
 * - FindSimilarQuestionOutput - The return type for the findSimilarQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Question } from '@/lib/types';

const QuestionSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    answers: z.array(z.object({
        id: z.string(),
        content: z.string(),
        upvotes: z.number(),
    })),
});


export const FindSimilarQuestionInputSchema = z.object({
  newQuestionTitle: z.string().describe('The title of the new question being asked.'),
  existingQuestions: z.array(QuestionSchema).describe('A list of existing questions to compare against.'),
});
export type FindSimilarQuestionInput = z.infer<typeof FindSimilarQuestionInputSchema>;


export const FindSimilarQuestionOutputSchema = z.object({
  isSimilar: z.boolean().describe('Whether a similar question was found.'),
  similarQuestionId: z.string().optional().describe('The ID of the most similar question found.'),
  justification: z.string().describe('An explanation of why the question is or is not considered similar.'),
  bestAnswer: z.string().optional().describe('The content of the highest-voted answer from the similar question.'),
});
export type FindSimilarQuestionOutput = z.infer<typeof FindSimilarQuestionOutputSchema>;

export async function findSimilarQuestion(input: FindSimilarQuestionInput): Promise<FindSimilarQuestionOutput> {
  return findSimilarQuestionFlow(input);
}


const findSimilarQuestionPrompt = ai.definePrompt({
    name: 'findSimilarQuestionPrompt',
    input: { schema: FindSimilarQuestionInputSchema },
    output: { schema: FindSimilarQuestionOutputSchema },
    prompt: `You are an expert at identifying duplicate questions on a community forum. 
    Your task is to determine if the "new question" is asking the same thing as any of the "existing questions".

    New Question Title: {{{newQuestionTitle}}}

    Analyze the list of existing questions:
    {{#each existingQuestions}}
    - Question ID: {{id}}, Title: "{{title}}"
    {{/each}}

    Please evaluate if the new question is a duplicate. 
    If it is, set 'isSimilar' to true, provide the 'similarQuestionId' of the best match, and a brief 'justification'.
    If it is NOT a duplicate, set 'isSimilar' to false and explain why in the 'justification'.

    If you find a similar question, you must also identify the answer with the most upvotes from that question's list of answers and provide its content in the 'bestAnswer' field. If the similar question has no answers, leave 'bestAnswer' empty.
    `,
});


const findSimilarQuestionFlow = ai.defineFlow(
  {
    name: 'findSimilarQuestionFlow',
    inputSchema: FindSimilarQuestionInputSchema,
    outputSchema: FindSimilarQuestionOutputSchema,
  },
  async (input) => {
    
    if (input.existingQuestions.length === 0) {
        return {
            isSimilar: false,
            justification: "There are no existing questions to compare against."
        }
    }

    const { output } = await findSimilarQuestionPrompt(input);
    
    if (output?.isSimilar && output.similarQuestionId) {
        const similarQuestion = input.existingQuestions.find(q => q.id === output.similarQuestionId);
        if (similarQuestion && similarQuestion.answers.length > 0) {
            const bestAnswer = similarQuestion.answers.reduce((prev, current) => (prev.upvotes > current.upvotes) ? prev : current);
            output.bestAnswer = bestAnswer.content;
        }
    }
    
    return output!;
  }
);
