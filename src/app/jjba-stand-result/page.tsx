
import { Suspense } from 'react';
import type { GenerateJjbaStandOutput } from '@/ai/flows/generate-jjba-stand-flow';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, Ghost, Sparkles, Zap, ShieldQuestion } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';

function StandResultDetails({ standResult }: { standResult: GenerateJjbaStandOutput }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-accent text-accent-foreground p-8 text-center">
          <div className="flex justify-center items-center mb-4">
             <Ghost className="h-16 w-16 text-primary drop-shadow-lg" />
          </div>
          <CardTitle className="text-4xl font-headline">Your Stand: {standResult.standName}</CardTitle>
          <CardDescription className="text-accent-foreground/90 text-lg mt-2">
            Behold the manifestation of your fighting spirit!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="md:flex md:space-x-8">
            <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
                <Image
                    src={`https://placehold.co/400x500.png`}
                    alt={`An artistic interpretation of ${standResult.standName}`}
                    data-ai-hint="stand user" 
                    width={400}
                    height={500}
                    className="rounded-lg shadow-lg border-4 border-primary/50 object-cover"
                />
            </div>
            <div className="md:w-1/2 space-y-6">
                <div>
                    <h3 className="text-2xl font-semibold mb-3 font-headline flex items-center">
                        <Zap className="h-7 w-7 mr-3 text-primary" /> Ability
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{standResult.standAbility}</p>
                </div>
                 <div>
                    <h3 className="text-2xl font-semibold mb-3 font-headline flex items-center">
                        <Sparkles className="h-7 w-7 mr-3 text-yellow-500" /> Appearance
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{standResult.standAppearance}</p>
                </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-2xl font-semibold mb-3 font-headline flex items-center">
              <ShieldQuestion className="h-7 w-7 mr-3 text-purple-500" /> Reasoning
            </h3>
            <div className="text-lg text-muted-foreground bg-muted/30 p-4 rounded-md leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: standResult.reasoning.replace(/\n/g, '<br />') }} />
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-muted/30 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg">
                <Link href="/jjba-stand-quiz">Try Again</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="/">Back to Home</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function StandResultPage({ searchParams }: { searchParams: { result?: string } }) {
  if (!searchParams.result) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">No Stand Data Found</h1>
        <p className="text-muted-foreground mb-6">
          It seems you've reached this page without discovering your Stand.
        </p>
        <Button asChild>
          <Link href="/jjba-stand-quiz">Discover Your Stand</Link>
        </Button>
      </div>
    );
  }

  let standResult: GenerateJjbaStandOutput | null = null;
  try {
    standResult = JSON.parse(decodeURIComponent(searchParams.result));
    if (!standResult || typeof standResult.standName !== 'string' || 
        typeof standResult.standAbility !== 'string' ||
        typeof standResult.standAppearance !== 'string' ||
        typeof standResult.reasoning !== 'string') {
        throw new Error("Invalid Stand result format");
    }
  } catch (error) {
    console.error("Error parsing Stand result from query params:", error);
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Error Loading Your Stand</h1>
        <p className="text-muted-foreground mb-6">
          There was an issue manifesting your Stand. Please try again.
        </p>
        <Button asChild>
          <Link href="/jjba-stand-quiz">Try Again</Link>
        </Button>
      </div>
    );
  }
  
  if (!standResult) {
    // This case should be caught by the try-catch, but as a fallback.
    return (
      <div className="text-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Stand Data Incomplete</h1>
        <p className="text-muted-foreground mb-6">
          The Stand data is incomplete. Please try the generator again.
        </p>
        <Button asChild>
          <Link href="/jjba-stand-quiz">Try Again</Link>
        </Button>
      </div>
    );
  }

  return (
    <Suspense fallback={<StandLoading />}>
      <StandResultDetails standResult={standResult} />
    </Suspense>
  );
}

function StandLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <LoadingSpinner size={64} />
      <h2 className="text-2xl font-semibold text-primary">Forging Your Stand...</h2>
      <p className="text-muted-foreground">This requires immense spiritual energy! Please wait...</p>
       <div className="w-full max-w-lg mt-4">
        <Card className="shadow-xl animate-pulse">
          <CardHeader className="bg-accent text-accent-foreground p-8 text-center">
             <div className="h-16 w-16 bg-primary/30 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-primary-foreground/30 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-5 bg-primary-foreground/20 rounded w-1/2 mx-auto"></div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-20 bg-muted rounded w-full mb-4"></div>
            <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-20 bg-muted rounded w-full mb-4"></div>
            <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-12 bg-muted rounded w-full"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
