import { useState } from 'react';
import { Header } from '@/components/Header';
import { StudentForm } from '@/components/StudentForm';
import { PredictionResult } from '@/components/PredictionResult';
import { FeatureImportanceChart } from '@/components/FeatureImportanceChart';
import { ModelInfo } from '@/components/ModelInfo';
import { predictPerformance, StudentInput, PredictionResult as PredictionResultType } from '@/lib/prediction';

const Index = () => {
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (input: StudentInput) => {
    setIsLoading(true);
    // Simulate API delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    const prediction = predictPerformance(input);
    setResult(prediction);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Student Performance Predictor
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Predict whether a student will pass or fail based on academic, demographic, 
            and behavioral factors using machine learning.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <StudentForm onPredict={handlePredict} isLoading={isLoading} />
          <PredictionResult result={result} />
        </div>

        {/* Secondary Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <FeatureImportanceChart result={result} />
          <ModelInfo />
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          This is a demonstration project. Predictions are simulated using a mock model 
          based on the UCI Student Performance Dataset patterns.
        </p>
      </main>
    </div>
  );
};

export default Index;
