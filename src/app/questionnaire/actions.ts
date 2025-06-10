'use server';

import { analyzePersonalityQuestionnaire } from '@/ai/flows/analyze-personality-questionnaire';
import type { QuestionnaireAnswer, PersonalityAnalysisResult } from '@/lib/types';
import { redirect } from 'next/navigation';
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
    redirect(`/profile?result=${queryString}`);
    
    // Note: redirect will prevent this return from being reached by client,
    // but it's good practice for type consistency if redirect was conditional.
    return { success: true, data: analysisResult };

  } catch (error) {
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
