import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Target, Zap } from 'lucide-react';

export function ModelInfo() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Model Information
        </CardTitle>
        <CardDescription>
          Technical details about the prediction model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              Algorithm
            </div>
            <p className="font-medium">Logistic Regression</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              Task Type
            </div>
            <p className="font-medium">Binary Classification</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              Training Data
            </div>
            <p className="font-medium">UCI Dataset</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Brain className="h-4 w-4" />
              Features
            </div>
            <p className="font-medium">6 Selected</p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Model Capabilities</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Interpretable</Badge>
            <Badge variant="secondary">Fast Inference</Badge>
            <Badge variant="secondary">Probability Scores</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
