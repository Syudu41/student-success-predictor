import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { PredictionResult } from '@/lib/prediction';

interface FeatureImportanceChartProps {
  result: PredictionResult | null;
}

export function FeatureImportanceChart({ result }: FeatureImportanceChartProps) {
  if (!result) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Feature Importance
          </CardTitle>
          <CardDescription>
            Shows which factors influence the prediction most
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-muted" />
            </div>
            <p className="text-muted-foreground">
              Make a prediction to see feature importance analysis
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = result.featureImportance.map((item, index) => ({
    name: item.feature,
    importance: Math.round(item.importance * 100),
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Feature Importance
        </CardTitle>
        <CardDescription>
          Model-derived weights showing each factor's influence on predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 80 }}
            >
              <XAxis 
                type="number" 
                domain={[0, 30]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                width={75}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                formatter={(value: number) => [`${value}%`, 'Importance']}
              />
              <Bar 
                dataKey="importance" 
                radius={[0, 4, 4, 0]}
                maxBarSize={24}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Based on Logistic Regression model trained on UCI Student Performance Dataset
        </p>
      </CardContent>
    </Card>
  );
}
