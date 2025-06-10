import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 tracking-tight">
            Discover Your <span className="text-primary">True Self</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock a deeper understanding of your personality with TypeMatch. Our AI-powered assessment helps you explore your unique strengths and preferences.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/questionnaire">Start Personality Test</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/mbti-explained">Learn About MBTI</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Brain className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Leverage advanced AI to get a detailed and accurate personality assessment based on your responses.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: '0.4s'}}>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Interactive Questionnaire</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Engage with our thoughtfully designed questionnaire, presented one step at a time for a focused experience.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: '0.6s'}}>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Understand Yourself</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Receive a comprehensive profile detailing your traits, strengths, and areas for personal growth.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <section className="py-12 md:py-16 bg-card rounded-xl shadow-xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Abstract representation of personality"
                data-ai-hint="abstract personality"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-headline mb-6">Ready to Begin Your Journey?</h2>
              <p className="text-muted-foreground mb-6">
                Knowing your personality type can provide valuable insights into your career choices, relationships, and personal development. Start today and take the first step towards self-discovery.
              </p>
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/questionnaire">Take the Test Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
