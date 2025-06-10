
'use server';

import { generateJjbaStand, type GenerateJjbaStandOutput } from '@/ai/flows/generate-jjba-stand-flow';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const StandQuizSubmissionSchema = z.object({
  userInput: z.string().min(10, { message: 'Please provide a more detailed description (at least 10 characters).' }),
});

export async function submitStandQuiz(
  formData: FormData
): Promise<{ success: boolean; message?: string; data?: GenerateJjbaStandOutput }> {
  const rawFormData = {
    userInput: formData.get('userInput') as string,
  };

  const validationResult = StandQuizSubmissionSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { userInput } = validationResult.data;

  try {
    const standResult = await generateJjbaStand({ userInput });

    if (!standResult || !standResult.standName) {
      return { success: false, message: 'Failed to generate your Stand. The result was inconclusive.' };
    }
    
    const queryString = encodeURIComponent(JSON.stringify(standResult));
    redirect(`/jjba-stand-result?result=${queryString}`);

  } catch (error: unknown) {
    if (typeof (error as any)?.digest === 'string' && 
        (error as any).digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.error("Error submitting Stand quiz:", error);
    let message = 'An unexpected error occurred while generating your Stand.';
    if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, message };
  }
}
