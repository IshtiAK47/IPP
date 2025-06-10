
'use server';
/**
 * @fileOverview Generates an image based on a text prompt using the Gemini model via Genkit.
 *
 * - generateImage - A function that calls the image generation flow.
 * - GenerateImageInput - The input type for the image generation (a text prompt).
 * - GenerateImageOutput - The output type for the image generation (image data URI).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use this specific model for image generation
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // IMPORTANT: Must include both TEXT and IMAGE
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed or returned no media URL.');
    }
    return {imageDataUri: media.url};
  }
);
