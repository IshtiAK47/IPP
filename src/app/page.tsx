
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, Ghost } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { generateImage } from '@/ai/flows/generate-image-flow';

async function GeneratedImageDisplay({
  promptKeywords,
  altText,
  basePlaceholderUrl,
  width,
  height,
  className = "rounded-lg shadow-lg",
}: {
  promptKeywords: string;
  altText: string;
  basePlaceholderUrl: string;
  width: number;
  height: number;
  className?: string;
}) {
  const prompt = `Generate an artistic image representing the concept: "${promptKeywords}". Style should be suitable for a modern web application about self-discovery and personality.`;
  let imageUrl = basePlaceholderUrl;

  try {
    const imageResult = await generateImage({ prompt });
    if (imageResult.imageDataUri) {
      imageUrl = imageResult.imageDataUri;
    }
  } catch (error) {
    console.error(`Failed to generate image for prompt "${promptKeywords}":`, error);
    // imageUrl remains the placeholder
  }

  return (
    <Image
      src={imageUrl}
      alt={altText}
      data-ai-hint={promptKeywords}
      width={width}
      height={height}
      className={className}
    />
  );
}

export default function HomePage() {
  const personalityImageHint = "abstract personality";
  const standImageHint = "aura energy";

  return (
    <div className="space-y-16 animate-fade-in">
      <section className="text-center py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 tracking-tight">
            Discover Your <span className="text-primary">True Self</span> & Unleash Your <span className="text-accent">Inner Stand</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock a deeper understanding of your personality with TypeMatch, or forge your unique Jojo's Bizarre Adventure Stand with our AI-powered generators!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/questionnaire">Start Personality Test</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/jjba-stand-quiz">Create My Jojo Stand</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Brain className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">AI-Powered Personality</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Leverage advanced AI for a detailed personality assessment based on MBTI concepts.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: '0.4s'}}>
          <CardHeader>
            <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit mb-4">
              <Ghost className="h-10 w-10 text-accent" />
            </div>
            <CardTitle className="font-headline text-2xl">AI-Generated Jojo Stands</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Describe yourself and let our AI create a unique Stand with custom abilities and appearance.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <section className="py-12 md:py-16 bg-card rounded-xl shadow-xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Suspense fallback={
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Loading abstract representation of personality..."
                  data-ai-hint={personalityImageHint}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg animate-pulse"
                />
              }>
                <GeneratedImageDisplay
                  promptKeywords={personalityImageHint}
                  altText="Abstract representation of personality"
                  basePlaceholderUrl="https://placehold.co/600x400.png"
                  width={600}
                  height={400}
                />
              </Suspense>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-headline mb-6">Explore Your Personality</h2>
              <p className="text-muted-foreground mb-6">
                Knowing your personality type can provide valuable insights into your career choices, relationships, and personal development.
              </p>
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/questionnaire">Take the Personality Test</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-accent/10 rounded-xl shadow-xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="md:flex md:items-center md:flex-row-reverse md:space-x-reverse md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
               <Suspense fallback={
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Loading mysterious energy aura..."
                  data-ai-hint={standImageHint}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg animate-pulse"
                />
              }>
                <GeneratedImageDisplay
                  promptKeywords={standImageHint}
                  altText="Mysterious energy aura representing a Jojo Stand"
                  basePlaceholderUrl="https://placehold.co/600x400.png"
                  width={600}
                  height={400}
                />
              </Suspense>
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <Ghost className="h-10 w-10 text-accent mr-3" />
                <h2 className="text-3xl font-bold font-headline">What's Your Jojo Stand?</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Ever wondered what your Stand would be in the Jojo's Bizarre Adventure universe? Unleash your fighting spirit and let our AI generator reveal your unique Stand and its powers!
              </p>
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/jjba-stand-quiz">Discover My Stand!</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
