import { GraduationCap, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg leading-tight">Student Performance</h1>
            <p className="text-xs text-muted-foreground">ML Prediction Dashboard</p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a 
            href="https://archive.ics.uci.edu/dataset/320/student+performance" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">Dataset</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
