import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <Sparkles className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
      <span className="text-2xl font-bold font-headline text-foreground group-hover:text-primary transition-colors duration-300">
        TypeMatch
      </span>
    </Link>
  );
}
