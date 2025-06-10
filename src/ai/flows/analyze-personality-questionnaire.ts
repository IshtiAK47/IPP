// use server'
'use server';

/**
 * @fileOverview Analyzes a user's questionnaire responses to provide an MBTI personality assessment.
 *
 * - analyzePersonalityQuestionnaire - A function that analyzes the questionnaire responses.
 * - AnalyzePersonalityQuestionnaireInput - The input type for the analyzePersonalityQuestionnaire function.
 * - AnalyzePersonalityQuestionnaireOutput - The return type for the analyzePersonalityQuestionnaire function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePersonalityQuestionnaireInputSchema = z.object({
  questionnaireResponses: z.array(
    z.object({
      question: z.string().describe('The question asked in the questionnaire.'),
      answer: z.string().describe('The user\'s answer to the question.'),
    })
  ).describe('An array of questions and the user\'s corresponding answers.'),
});

export type AnalyzePersonalityQuestionnaireInput = z.infer<typeof AnalyzePersonalityQuestionnaireInputSchema>;

const AnalyzePersonalityQuestionnaireOutputSchema = z.object({
  mbtiType: z.string().describe('The predicted MBTI personality type (e.g., ENFJ, INTP).'),
  summary: z.string().describe('A detailed summary of the user\'s personality traits based on their responses.'),
  strengths: z.array(z.string()).describe('A list of the user\'s strengths.'),
  weaknesses: z.array(z.string()).describe('A list of the user\'s weaknesses.'),
});

export type AnalyzePersonalityQuestionnaireOutput = z.infer<typeof AnalyzePersonalityQuestionnaireOutputSchema>;

export async function analyzePersonalityQuestionnaire(input: AnalyzePersonalityQuestionnaireInput): Promise<AnalyzePersonalityQuestionnaireOutput> {
  return analyzePersonalityQuestionnaireFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePersonalityQuestionnairePrompt',
  input: {schema: AnalyzePersonalityQuestionnaireInputSchema},
  output: {schema: AnalyzePersonalityQuestionnaireOutputSchema},
  prompt: `You are an expert in personality assessments, specifically the Myers-Briggs Type Indicator (MBTI). Analyze the user's responses to the questionnaire and provide a detailed personality assessment.

  Based on their answers, determine their MBTI type, provide a summary of their personality, list their strengths, and list their weaknesses.

  Here are the user's responses:
  {{#each questionnaireResponses}}
  Question: {{{question}}}
  Answer: {{{answer}}}
  {{/each}}
  `,
});

const analyzePersonalityQuestionnaireFlow = ai.defineFlow(
  {
    name: 'analyzePersonalityQuestionnaireFlow',
    inputSchema: AnalyzePersonalityQuestionnaireInputSchema,
    outputSchema: AnalyzePersonalityQuestionnaireOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
