import type { AnalyzePersonalityQuestionnaireOutput } from "@/ai/flows/analyze-personality-questionnaire";

export type QuestionnaireAnswer = {
  questionId: string;
  questionText: string; // The question text that was sent to AI
  answerValue: string; // The answer value that was sent to AI
};

export type PersonalityAnalysisResult = AnalyzePersonalityQuestionnaireOutput;
