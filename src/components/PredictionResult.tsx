import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { PredictionResult as PredictionResultType } from '@/lib/prediction';
import { cn } from '@/lib/utils';

interface PredictionResultProps {
  result: PredictionResultType | null;
}

export function PredictionResult({ result }: PredictionResultProps) {
  if (!result) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Prediction Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-muted" />
            </div>
            <p className="text-muted-foreground">
              Enter student attributes and click "Predict Performance" to see results
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPassing = result.prediction === 'pass';
  const probabilityPercent = Math.round(result.probability * 100);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Prediction Result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Prediction */}
        <div className={cn(
          "rounded-lg p-6 text-center transition-all",
          isPassing 
            ? "bg-emerald-500/10 border border-emerald-500/20" 
            : "bg-destructive/10 border border-destructive/20"
        )}>
          <div className="flex items-center justify-center gap-3 mb-2">
            {isPassing ? (
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <span className={cn(
              "text-3xl font-bold",
              isPassing ? "text-emerald-500" : "text-destructive"
            )}>
              {isPassing ? 'PASS' : 'FAIL'}
            </span>
          </div>
          <Badge variant={isPassing ? "secondary" : "destructive"} className="mt-2">
            {isPassing ? 'Student is likely to pass' : 'Student is at risk of failing'}
          </Badge>
        </div>

        {/* Confidence Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Model Confidence</span>
            <span className="text-sm font-bold text-primary">{probabilityPercent}%</span>
          </div>
          <Progress 
            value={probabilityPercent} 
            className={cn(
              "h-3",
              isPassing ? "[&>div]:bg-emerald-500" : "[&>div]:bg-destructive"
            )}
          />
          <p className="text-xs text-muted-foreground">
            {probabilityPercent >= 70 
              ? "High confidence prediction" 
              : probabilityPercent >= 50 
                ? "Moderate confidence - borderline case"
                : "Low confidence - intervention recommended"}
          </p>
        </div>

        {/* Key Insights */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Input Summary</h4>
          <div className="grid grid-cols-2 gap-2">
            {result.featureImportance.slice(0, 4).map((feature) => (
              <div 
                key={feature.feature}
                className="rounded-md bg-muted/30 px-3 py-2 text-sm"
              >
                <span className="text-muted-foreground">{feature.feature}:</span>
                <span className="ml-1 font-medium">{feature.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
