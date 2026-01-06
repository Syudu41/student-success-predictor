// Mock prediction service simulating a backend ML model
// In production, this would call your actual prediction API

export interface StudentInput {
  age: number;
  studyTime: number;
  failures: number;
  familySupport: boolean;
  absences: number;
  alcoholConsumption: number;
}

export interface PredictionResult {
  prediction: 'pass' | 'fail';
  probability: number;
  featureImportance: {
    feature: string;
    importance: number;
    value: string | number;
  }[];
}

// Feature importance weights (simulating a trained model)
const featureWeights = {
  studyTime: 0.28,
  failures: 0.24,
  absences: 0.18,
  familySupport: 0.14,
  alcoholConsumption: 0.10,
  age: 0.06,
};

export function predictPerformance(input: StudentInput): PredictionResult {
  // Simulate model prediction logic
  let score = 0.5; // Base probability

  // Study time (1-4 scale) - higher is better
  score += (input.studyTime - 2) * 0.12;

  // Past failures - each failure reduces probability
  score -= input.failures * 0.15;

  // Family support - positive influence
  if (input.familySupport) {
    score += 0.08;
  }

  // Absences - negative correlation
  score -= (input.absences / 30) * 0.2;

  // Alcohol consumption (1-5 scale) - higher is worse
  score -= (input.alcoholConsumption - 1) * 0.04;

  // Age factor (slight adjustment)
  if (input.age >= 18 && input.age <= 20) {
    score += 0.03;
  }

  // Clamp probability between 0.05 and 0.95
  const probability = Math.max(0.05, Math.min(0.95, score));

  const featureImportance = [
    { feature: 'Study Time', importance: featureWeights.studyTime, value: `${input.studyTime} hrs/week` },
    { feature: 'Past Failures', importance: featureWeights.failures, value: input.failures },
    { feature: 'Absences', importance: featureWeights.absences, value: input.absences },
    { feature: 'Family Support', importance: featureWeights.familySupport, value: input.familySupport ? 'Yes' : 'No' },
    { feature: 'Alcohol Level', importance: featureWeights.alcoholConsumption, value: input.alcoholConsumption },
    { feature: 'Age', importance: featureWeights.age, value: input.age },
  ].sort((a, b) => b.importance - a.importance);

  return {
    prediction: probability >= 0.5 ? 'pass' : 'fail',
    probability,
    featureImportance,
  };
}
