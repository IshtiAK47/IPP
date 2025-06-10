
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
    )
    .optional(), // Made optional to handle generation failures gracefully
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
    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use this specific model for image generation
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // IMPORTANT: Must include both TEXT and IMAGE
        },
      });

      if (!media?.url) {
        console.warn(`Image generation returned no media URL for prompt: "${input.prompt}"`);
        return { imageDataUri: undefined };
      }
      return {imageDataUri: media.url};
    } catch (error) {
      console.error(`Error during image generation in flow for prompt: "${input.prompt}". Falling back. Error:`, error);
      // Specific check for rate limit errors to provide a clearer warning
      if (error instanceof Error && error.message.includes('429')) {
        console.warn(`Rate limit likely hit for image generation (prompt: "${input.prompt}"). Consider checking API quotas.`);
      }
      return { imageDataUri: undefined }; // Return undefined URI on error
    }
  }
);

