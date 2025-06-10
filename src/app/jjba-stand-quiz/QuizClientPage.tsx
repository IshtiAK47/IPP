
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitStandQuiz } from './actions';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AlertCircle, CheckCircle, Wand2 } from 'lucide-react';

export default function JjbaStandQuizClientPage() {
  const [userInput, setUserInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim().length < 10) {
      toast({
        title: "Input Required",
        description: "Please provide a bit more about yourself (at least 10 characters).",
        variant: "destructive",
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }

    const formData = new FormData();
    formData.append('userInput', userInput);

    startTransition(async () => {
      const result = await submitStandQuiz(formData);
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
            Describe yourself, and let the AI forge your unique Stand.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 md:p-8 min-h-[250px] flex flex-col justify-center space-y-6">
            <div>
              <Label htmlFor="userInput" className="text-lg font-semibold mb-2 block">
                Tell us about yourself:
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                Consider your personality, greatest strength, biggest fear, or a core aspiration. The more detail, the better your Stand!
              </p>
              <Textarea
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., I'm a quiet observer who values justice above all. My biggest fear is losing control..."
                rows={6}
                className="text-base"
                required
                minLength={10}
              />
            </div>
          </CardContent>

          <CardFooter className="p-6 bg-muted/30 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isPending || userInput.trim().length < 10}>
              {isPending ? <LoadingSpinner className="mr-2" /> : <CheckCircle className="mr-2 h-5 w-5" />}
              Reveal My Stand!
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
