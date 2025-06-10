
'use server';
/**
 * @fileOverview Generates a Jojo's Bizarre Adventure Stand for a user based on their input.
 *
 * - generateJjbaStand - A function that generates the Stand.
 * - GenerateJjbaStandInput - The input type for the generateJjbaStand function.
 * - GenerateJjbaStandOutput - The return type for the generateJjbaStand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJjbaStandInputSchema = z.object({
  userInput: z.string().describe('A description of the user\'s personality, strengths, fears, or aspirations. This will be used to generate a fitting Stand.'),
});
export type GenerateJjbaStandInput = z.infer<typeof GenerateJjbaStandInputSchema>;

const GenerateJjbaStandOutputSchema = z.object({
  standName: z.string().describe('The unique name of the generated Stand (e.g., "Star Platinum", "Crazy Diamond"). Should be creative and evocative.'),
  standAbility: z.string().describe('A detailed description of the Stand\'s primary ability and how it works. Should be unique and interesting.'),
  standAppearance: z.string().describe('A description of the Stand\'s visual appearance (e.g., humanoid, object-like, colors, features).'),
  reasoning: z.string().describe('An explanation of why this Stand and its abilities are a good fit for the user based on their input.'),
});
export type GenerateJjbaStandOutput = z.infer<typeof GenerateJjbaStandOutputSchema>;

export async function generateJjbaStand(input: GenerateJjbaStandInput): Promise<GenerateJjbaStandOutput> {
  return generateJjbaStandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJjbaStandPrompt',
  input: {schema: GenerateJjbaStandInputSchema},
  output: {schema: GenerateJjbaStandOutputSchema},
  prompt: `You are an expert Stand creator from Jojo's Bizarre Adventure.
  A user has provided a description of themselves. Your task is to invent a unique and fitting Stand for them.

  User Input:
  "{{{userInput}}}"

  Based on this input, generate the following for their Stand:
  1.  **Stand Name**: Creative, memorable, and fitting the Jojo universe (often musical references, but not strictly necessary).
  2.  **Stand Ability**: A detailed and unique power. Explain what it does and any limitations. Avoid overly common or generic powers. Think about how it might reflect the user's input.
  3.  **Stand Appearance**: Describe its visual form. Is it humanoid, object-based, abstract? What are its key features and colors?
  4.  **Reasoning**: Briefly explain how the Stand's name, ability, and/or appearance connect to the user's provided input.

  Ensure the Stand is original and feels like it could genuinely appear in Jojo's Bizarre Adventure.
  Be creative and detailed in your descriptions.
  Output the result in the specified JSON format.
  `,
});

const generateJjbaStandFlow = ai.defineFlow(
  {
    name: 'generateJjbaStandFlow',
    inputSchema: GenerateJjbaStandInputSchema,
    outputSchema: GenerateJjbaStandOutputSchema,
  },
  async (input: GenerateJjbaStandInput) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate Stand. AI model did not return an output.');
    }
    return output;
  }
);
