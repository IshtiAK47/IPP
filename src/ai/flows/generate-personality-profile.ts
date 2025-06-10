// use server'

/**
 * @fileOverview Generates a detailed personality profile based on the user's MBTI type using Gemini.
 *
 * - generatePersonalityProfile - A function that generates the personality profile.
 * - GeneratePersonalityProfileInput - The input type for the generatePersonalityProfile function.
 * - GeneratePersonalityProfileOutput - The return type for the generatePersonalityProfile function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalityProfileInputSchema = z.object({
  mbtiType: z
    .string()
    .describe('The user\s MBTI personality type (e.g., INFJ, ENTP).'),
  userDetails: z.string().describe('Details about the user.'),
});

export type GeneratePersonalityProfileInput = z.infer<
  typeof GeneratePersonalityProfileInputSchema
>;

const GeneratePersonalityProfileOutputSchema = z.object({
  profile: z
    .string()
    .describe(
      'A detailed and easy-to-understand personality profile based on the MBTI type.'
    ),
});

export type GeneratePersonalityProfileOutput = z.infer<
  typeof GeneratePersonalityProfileOutputSchema
>;

export async function generatePersonalityProfile(
  input: GeneratePersonalityProfileInput
): Promise<GeneratePersonalityProfileOutput> {
  return generatePersonalityProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalityProfilePrompt',
  input: {schema: GeneratePersonalityProfileInputSchema},
  output: {schema: GeneratePersonalityProfileOutputSchema},
  prompt: `You are an expert personality profiler, skilled in creating detailed and insightful personality profiles based on the MBTI personality types.

  Based on the user's MBTI type and user details, generate a comprehensive personality profile that is easy to understand. Emphasize the strengths and potential areas for growth.  The profile should be engaging and provide actionable insights.

  MBTI Type: {{{mbtiType}}}
  User Details: {{{userDetails}}}
  Profile:
  `,
});

const generatePersonalityProfileFlow = ai.defineFlow(
  {
    name: 'generatePersonalityProfileFlow',
    inputSchema: GeneratePersonalityProfileInputSchema,
    outputSchema: GeneratePersonalityProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
