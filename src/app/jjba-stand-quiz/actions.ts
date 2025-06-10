
'use server';

import { generateJjbaStand, type GenerateJjbaStandOutput } from '@/ai/flows/generate-jjba-stand-flow';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const StandQuizAnswerSchema = z.object({
  question: z.string(),
  answer: z.string().min(1, { message: 'Please select an answer for each question.' }),
});

const StandQuizSubmissionSchema = z.array(StandQuizAnswerSchema).min(1, { message: 'Please answer at least one question.'});

export async function submitStandQuiz(
  answers: { question: string; answer: string }[]
): Promise<{ success: boolean; message?: string; data?: GenerateJjbaStandOutput }> {
  
  const validationResult = StandQuizSubmissionSchema.safeParse(answers);

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors.map((e) => e.message).join(', '),
    };
  }

  const questionnaireResponses = validationResult.data;

  try {
    const standResult = await generateJjbaStand({ questionnaireResponses });

    if (!standResult || !standResult.standName) {
      return { success: false, message: 'Failed to generate your Stand. The result was inconclusive.' };
    }
    
    const queryString = encodeURIComponent(JSON.stringify(standResult));
    redirect(`/jjba-stand-result?result=${queryString}`);

  } catch (error: unknown) {
    // Check for redirect error (Next.js 14+)
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
