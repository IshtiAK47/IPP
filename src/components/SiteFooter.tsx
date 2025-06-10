export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TypeMatch. All rights reserved.</p>
        <p className="mt-1">Discover your true self.</p>
      </div>
    </footer>
  );
}
