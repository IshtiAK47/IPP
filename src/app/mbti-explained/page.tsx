import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, Puzzle, Compass } from "lucide-react";

export default function MbtiExplainedPage() {
  const dichotomies = [
    {
      name: "Extraversion (E) vs. Introversion (I)",
      description: "This dichotomy describes how individuals direct and receive energy. Extraverts are energized by interacting with people and taking action, while Introverts are energized by spending time alone or in quiet reflection.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      name: "Sensing (S) vs. Intuition (N)",
      description: "This describes how individuals perceive information. Sensing types focus on concrete facts and details experienced through the five senses. Intuitive types focus on patterns, possibilities, and the bigger picture.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
    },
    {
      name: "Thinking (T) vs. Feeling (F)",
      description: "This dichotomy describes how individuals make decisions. Thinking types prioritize logic, objective analysis, and consistency. Feeling types prioritize empathy, harmony, and values.",
      icon: <Puzzle className="h-8 w-8 text-primary" />,
    },
    {
      name: "Judging (J) vs. Perceiving (P)",
      description: "This describes how individuals prefer to live their outer life. Judging types prefer structure, plans, and decisiveness. Perceiving types prefer flexibility, spontaneity, and keeping options open.",
      icon: <Compass className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold font-headline mb-4 text-primary">Understanding MBTI</h1>
        <p className="text-xl text-muted-foreground">
          A brief overview of the Myers-Briggs Type Indicator.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">What is MBTI?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
          <p>
            The Myers-Briggs Type Indicator (MBTI) is a self-report questionnaire designed to indicate different psychological preferences in how people perceive the world and make decisions. Developed by Isabel Myers and Katharine Briggs during World War II, it is based on Carl Jung's theory of personality types.
          </p>
          <p>
            The MBTI assessment identifies preferences on four dichotomies, resulting in 16 distinct personality types. It's important to remember that MBTI describes preferences, not abilities or skills. There is no "better" or "worse" type.
          </p>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">The Four Dichotomies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {dichotomies.map((dichotomy) => (
            <Card key={dichotomy.name} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">{dichotomy.icon}</div>
                <CardTitle className="font-headline text-xl">{dichotomy.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dichotomy.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">How Can MBTI Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
          <p>
            Understanding your MBTI type can help you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Improve self-awareness and understand your natural strengths.</li>
            <li>Appreciate differences in others and improve communication.</li>
            <li>Make informed decisions about careers and relationships.</li>
            <li>Identify potential areas for personal growth and development.</li>
          </ul>
          <p>
            TypeMatch uses AI to analyze your responses and provide insights related to these concepts, helping you on your journey of self-discovery.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
