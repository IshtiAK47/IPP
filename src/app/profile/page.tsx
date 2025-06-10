import { Suspense } from 'react';
import { generatePersonalityProfile } from '@/ai/flows/generate-personality-profile';
import type { PersonalityAnalysisResult } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, Brain, CheckCircle, Heart, Lightbulb, ShieldAlert, ThumbsUp, Award } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';

interface ProfilePageProps {
  searchParams: {
    result?: string;
  };
}

async function ProfileDetails({ analysisResult }: { analysisResult: PersonalityAnalysisResult }) {
  let detailedProfile = null;
  try {
    const profileData = await generatePersonalityProfile({
      mbtiType: analysisResult.mbtiType,
      userDetails: analysisResult.summary, // Use summary from first AI call as userDetails
    });
    detailedProfile = profileData.profile;
  } catch (error) {
    console.error("Error generating detailed profile:", error);
    // detailedProfile remains null, UI will show a message
  }

  const getTraitIcon = (trait: string) => {
    if (trait.toLowerCase().includes('logical') || trait.toLowerCase().includes('analytical')) return <Brain className="h-5 w-5 mr-2 text-primary" />;
    if (trait.toLowerCase().includes('empathetic') || trait.toLowerCase().includes('caring')) return <Heart className="h-5 w-5 mr-2 text-pink-500" />;
    if (trait.toLowerCase().includes('creative') || trait.toLowerCase().includes('imaginative')) return <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />;
    return <CheckCircle className="h-5 w-5 mr-2 text-green-500" />;
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl overflow-hidden animate-fade-in">
        <CardHeader className="bg-primary text-primary-foreground p-8 text-center">
          <div className="flex justify-center items-center mb-4">
             <Award className="h-16 w-16 text-accent drop-shadow-lg" />
          </div>
          <CardTitle className="text-4xl font-headline">Your Personality Profile: {analysisResult.mbtiType}</CardTitle>
          <CardDescription className="text-primary-foreground/80 text-lg mt-2">
            An overview of your unique traits and characteristics.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-3 font-headline flex items-center">
              <Brain className="h-7 w-7 mr-3 text-accent" /> Summary
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{analysisResult.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3 font-headline flex items-center">
                <ThumbsUp className="h-7 w-7 mr-3 text-green-500" /> Strengths
              </h3>
              <ul className="space-y-2">
                {analysisResult.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start p-3 bg-green-500/10 rounded-md">
                    {getTraitIcon(strength)}
                    <span className="text-md text-green-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 font-headline flex items-center">
                <ShieldAlert className="h-7 w-7 mr-3 text-orange-500" /> Potential Growth Areas
              </h3>
              <ul className="space-y-2">
                {analysisResult.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start p-3 bg-orange-500/10 rounded-md">
                    {getTraitIcon(weakness)}
                    <span className="text-md text-orange-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {detailedProfile && (
             <div>
                <h3 className="text-2xl font-semibold mb-3 font-headline flex items-center">
                    <Lightbulb className="h-7 w-7 mr-3 text-yellow-500" /> Deeper Insights
                </h3>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: detailedProfile.replace(/\n/g, '<br />') }} />
            </div>
          )}
          {!detailedProfile && (
             <div className="p-4 bg-yellow-500/10 rounded-md text-yellow-700 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5"/>
                <p>Could not load detailed insights at this time. The summary above provides key information.</p>
             </div>
          )}

        </CardContent>
        <CardFooter className="p-6 bg-muted/30 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg">
                <Link href="/questionnaire">Take Test Again</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="/mbti-explained">Learn More About MBTI</Link>
            </Button>
        </CardFooter>
      </Card>
       <div className="text-center mt-8">
         <Image 
            src="https://placehold.co/700x300.png" 
            alt="Decorative image for personality insights"
            data-ai-hint="abstract thinking"
            width={700}
            height={300}
            className="rounded-lg shadow-md mx-auto"
          />
      </div>
    </div>
  );
}

export default function ProfilePage({ searchParams }: ProfilePageProps) {
  if (!searchParams.result) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">No Profile Data Found</h1>
        <p className="text-muted-foreground mb-6">
          It seems you've reached this page without completing the questionnaire.
        </p>
        <Button asChild>
          <Link href="/questionnaire">Start Personality Test</Link>
        </Button>
      </div>
    );
  }

  let analysisResult: PersonalityAnalysisResult | null = null;
  try {
    analysisResult = JSON.parse(decodeURIComponent(searchParams.result));
    if (!analysisResult || typeof analysisResult.mbtiType !== 'string') {
        throw new Error("Invalid result format");
    }
  } catch (error) {
    console.error("Error parsing result from query params:", error);
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Error Loading Profile</h1>
        <p className="text-muted-foreground mb-6">
          There was an issue decoding your personality profile results. Please try the test again.
        </p>
        <Button asChild>
          <Link href="/questionnaire">Retake Test</Link>
        </Button>
      </div>
    );
  }
  
  if (!analysisResult) {
      // This case should ideally be caught by the try-catch block, but as a fallback:
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Profile Data Incomplete</h1>
        <p className="text-muted-foreground mb-6">
          The personality profile data is incomplete. Please try the test again.
        </p>
        <Button asChild>
          <Link href="/questionnaire">Retake Test</Link>
        </Button>
      </div>
    );
  }


  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileDetails analysisResult={analysisResult} />
    </Suspense>
  );
}

function ProfileLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <LoadingSpinner size={64} />
      <h2 className="text-2xl font-semibold text-primary">Generating Your Profile...</h2>
      <p className="text-muted-foreground">This may take a few moments. We're tailoring your results!</p>
       <div className="w-full max-w-md mt-4">
        <Card className="shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground p-8 text-center">
             <div className="animate-pulse h-10 w-10 bg-primary-foreground/30 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-primary-foreground/30 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-5 bg-primary-foreground/20 rounded w-1/2 mx-auto"></div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-20 bg-muted rounded w-full mb-4"></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="h-6 bg-muted rounded w-1/2 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-muted rounded"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              </div>
               <div>
                <div className="h-6 bg-muted rounded w-1/2 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-muted rounded"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
