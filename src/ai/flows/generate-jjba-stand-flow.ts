
'use server';
/**
 * @fileOverview Generates a Jojo's Bizarre Adventure Stand for a user based on their questionnaire responses.
 *
 * - generateJjbaStand - A function that generates the Stand.
 * - GenerateJjbaStandInput - The input type for the generateJjbaStand function.
 * - GenerateJjbaStandOutput - The return type for the generateJjbaStand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJjbaStandInputSchema = z.object({
  questionnaireResponses: z.array(
    z.object({
      question: z.string().describe('The question asked in the Jojo Stand questionnaire.'),
      answer: z.string().describe('The user\'s answer to the question.'),
    })
  ).describe('An array of questions and the user\'s corresponding answers for Stand generation.'),
});
export type GenerateJjbaStandInput = z.infer<typeof GenerateJjbaStandInputSchema>;

const GenerateJjbaStandOutputSchema = z.object({
  standName: z.string().describe('The unique name of the generated Stand (e.g., "Star Platinum", "Crazy Diamond"). Should be creative, evocative, and ideally reference music if inspired by user\'s music choice.'),
  standAbility: z.string().describe('A detailed description of the Stand\'s primary ability and how it works. Should be unique, interesting, and reflect the user\'s choices.'),
  standAppearance: z.string().describe('A description of the Stand\'s visual appearance (e.g., humanoid, object-like, colors, features), reflecting user choices about demeanor and style.'),
  reasoning: z.string().describe('An explanation of why this Stand, its abilities, and appearance are a good fit for the user based on their questionnaire responses.'),
  // Optional: Add Stand Stats like in Jojo if desired by the AI
  // destructivePower: z.string().optional().describe('Stand Stat: Destructive Power (e.g., A, B, C, D, E, None, Infinite)'),
  // speed: z.string().optional().describe('Stand Stat: Speed (e.g., A, B, C, D, E, None, Infinite)'),
  // range: z.string().optional().describe('Stand Stat: Range (e.g., A, B, C, D, E, None, Infinite)'),
  // durability: z.string().optional().describe('Stand Stat: Durability/Staying (e.g., A, B, C, D, E, None, Infinite)'),
  // precision: z.string().optional().describe('Stand Stat: Precision (e.g., A, B, C, D, E, None, Infinite)'),
  // developmentPotential: z.string().optional().describe('Stand Stat: Development Potential/Learning (e.g., A, B, C, D, E, None, Infinite)'),
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
  A user has answered a questionnaire to help you design a unique Stand for them.
  Analyze their responses carefully to create a Stand that truly reflects their choices.

  User's Questionnaire Responses:
  {{#each questionnaireResponses}}
  Question: {{{question}}}
  Answer: {{{answer}}}
  {{/each}}

  Based on these responses, generate the following for their Stand:
  1.  **Stand Name**: Creative, memorable, and fitting the Jojo universe. If their music choice provides inspiration (e.g., a band, song, or artist), try to incorporate that subtly or directly. Otherwise, be inventive.
  2.  **Stand Ability**: A detailed and unique power. Explain what it does and any limitations. This should strongly correlate with their choices for "Desired Ability Type" and "Preferred Combat Style".
  3.  **Stand Appearance**: Describe its visual form. Is it humanoid, object-based, abstract? What are its key features and colors? This should reflect their choice for "Stand's Personality/Attitude".
  4.  **Reasoning**: Briefly explain how the Stand's name, ability, and/or appearance connect to the user's questionnaire answers, explicitly referencing their choices.

  Ensure the Stand is original and feels like it could genuinely appear in Jojo's Bizarre Adventure.
  Be creative and detailed in your descriptions.
  Output the result in the specified JSON format.
  Do not include Stand Stats (like Destructive Power, Speed, etc.) in this version.
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
