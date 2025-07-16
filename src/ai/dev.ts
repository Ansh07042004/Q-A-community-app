import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-answers.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/find-similar-question.ts';
import '@/ai/flows/answer-question.ts';
import '@/ai/flows/chat.ts';
