
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { submitStandQuiz } from './actions';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AlertCircle, CheckCircle, Wand2 } from 'lucide-react';
import { jjbaQuestions, type JjbaQuestion, type JjbaQuestionOption } from '@/lib/jjba-questions';

export default function JjbaStandQuizClientPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const currentQuestion: JjbaQuestion = jjbaQuestions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / jjbaQuestions.length) * 100;

  const handleOptionSelect = (questionId: string, optionValue: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion.id]) {
      toast({
        title: "Selection Required",
        description: "Please select an option before proceeding.",
        variant: "destructive",
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }
    if (currentQuestionIndex < jjbaQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
     if (!selectedAnswers[currentQuestion.id]) {
      toast({
        title: "Selection Required",
        description: "Please select an option for the final question.",
        variant: "destructive",
         icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }
    
    if (Object.keys(selectedAnswers).length !== jjbaQuestions.length) {
       toast({
        title: "Incomplete Quiz",
        description: "Please ensure all questions are answered.",
        variant: "destructive",
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }

    const formattedAnswers = jjbaQuestions.map(q => ({
      question: q.questionText, // Send the AI-context question text
      answer: selectedAnswers[q.id] || '', 
    }));

    startTransition(async () => {
      const result = await submitStandQuiz(formattedAnswers);
      if (result?.success === false && result.message) {
        toast({
          title: 'Error Generating Stand',
          description: result.message,
          variant: 'destructive',
          icon: <AlertCircle className="h-5 w-5" />,
        });
      }
      // On success, the action handles redirection.
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8 animate-fade-in">
      <Card className="shadow-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex justify-center mb-4">
            <Wand2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-headline text-center text-primary">
            Discover Your Jojo Stand!
          </CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Answer the questions, and let the AI forge your unique Stand.
          </CardDescription>
        </CardHeader>

        <div className="px-6 py-4">
           <Progress value={progressValue} className="w-full h-3 mb-2" />
           <p className="text-sm text-muted-foreground text-center">
             Question {currentQuestionIndex + 1} of {jjbaQuestions.length}
           </p>
        </div>
        
        <CardContent className="p-6 md:p-8 min-h-[300px] flex flex-col justify-center">
          <div key={currentQuestion.id} className="animate-fade-in">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
              {currentQuestion.displayText}
            </h2>
            <RadioGroup
              value={selectedAnswers[currentQuestion.id] || ''}
              onValueChange={(value) => handleOptionSelect(currentQuestion.id, value)}
              className="space-y-4"
            >
              {currentQuestion.options.map((option: JjbaQuestionOption) => (
                <Label
                  key={option.value}
                  htmlFor={`${currentQuestion.id}-${option.value}`}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/5
                    ${selectedAnswers[currentQuestion.id] === option.value ? 'border-primary ring-2 ring-primary bg-primary/10 shadow-md' : 'border-border'}`}
                >
                  <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                  <span className="text-base md:text-lg">{option.text}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter className="p-6 bg-muted/30 flex justify-end">
          {currentQuestionIndex < jjbaQuestions.length - 1 ? (
            <Button onClick={handleNext} size="lg" className="w-full md:w-auto" disabled={isPending || !selectedAnswers[currentQuestion.id]}>
              Next Question
            </Button>
          ) : (
            <Button onClick={handleSubmit} size="lg" className="w-full md:w-auto" disabled={isPending || !selectedAnswers[currentQuestion.id]}>
              {isPending ? <LoadingSpinner className="mr-2" /> : <CheckCircle className="mr-2 h-5 w-5" />}
              Reveal My Stand!
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
