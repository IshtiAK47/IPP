
'use server';

import { analyzePersonalityQuestionnaire } from '@/ai/flows/analyze-personality-questionnaire';
import type { PersonalityAnalysisResult } from '@/lib/types';
import { redirect } from 'next/navigation'; // Removed isRedirectError
import { z } from 'zod';

const QuestionnaireSubmissionSchema = z.array(
  z.object({
    questionText: z.string(),
    answerValue: z.string(),
  })
);

export async function submitQuestionnaire(
  answers: { questionText: string; answerValue: string }[]
): Promise<{ success: boolean; message?: string; data?: PersonalityAnalysisResult }> {
  try {
    const validatedAnswers = QuestionnaireSubmissionSchema.parse(answers);
    
    const questionnaireResponses = validatedAnswers.map(ans => ({
      question: ans.questionText,
      answer: ans.answerValue,
    }));

    const analysisResult = await analyzePersonalityQuestionnaire({ questionnaireResponses });

    if (!analysisResult || !analysisResult.mbtiType) {
      return { success: false, message: 'Failed to analyze personality. The result was inconclusive.' };
    }
    
    const queryString = encodeURIComponent(JSON.stringify(analysisResult));
    // The redirect function throws an error, which will be caught by the catch block.
    // If it's a redirect error, it must be re-thrown for Next.js to handle it.
    redirect(`/profile?result=${queryString}`);

  } catch (error: unknown) { // Catch error as unknown
    // If the error is a redirect error, re-throw it so Next.js can handle the redirect.
    // Check the error's digest property directly.
    if (typeof (error as any)?.digest === 'string' && 
        (error as any).digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    // Handle other errors
    console.error("Error submitting questionnaire:", error);
    let message = 'An unexpected error occurred.';
    if (error instanceof z.ZodError) {
      message = 'Invalid data submitted. Please try again.';
    } else if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, message };
  }
}
