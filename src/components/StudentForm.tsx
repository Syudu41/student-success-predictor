import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Sparkles } from 'lucide-react';
import { StudentInput } from '@/lib/prediction';

interface StudentFormProps {
  onPredict: (input: StudentInput) => void;
  isLoading: boolean;
}

export function StudentForm({ onPredict, isLoading }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentInput>({
    age: 17,
    studyTime: 2,
    failures: 0,
    familySupport: true,
    absences: 5,
    alcoholConsumption: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const FieldTooltip = ({ content }: { content: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Student Attributes
        </CardTitle>
        <CardDescription>
          Enter student information to predict academic performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="age">Age</Label>
              <FieldTooltip content="Student's age in years (15-22 typical range)" />
            </div>
            <Input
              id="age"
              type="number"
              min={15}
              max={25}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 15 })}
            />
          </div>

          {/* Study Time */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Weekly Study Time</Label>
                <FieldTooltip content="Hours spent studying per week (1 = <2hrs, 2 = 2-5hrs, 3 = 5-10hrs, 4 = >10hrs)" />
              </div>
              <span className="text-sm font-medium text-primary">
                {formData.studyTime === 1 && '<2 hours'}
                {formData.studyTime === 2 && '2-5 hours'}
                {formData.studyTime === 3 && '5-10 hours'}
                {formData.studyTime === 4 && '>10 hours'}
              </span>
            </div>
            <Slider
              value={[formData.studyTime]}
              onValueChange={([value]) => setFormData({ ...formData, studyTime: value })}
              min={1}
              max={4}
              step={1}
            />
          </div>

          {/* Past Failures */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="failures">Number of Past Class Failures</Label>
              <FieldTooltip content="Number of past class failures (0-3)" />
            </div>
            <Input
              id="failures"
              type="number"
              min={0}
              max={4}
              value={formData.failures}
              onChange={(e) => setFormData({ ...formData, failures: parseInt(e.target.value) || 0 })}
            />
          </div>

          {/* Family Support */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="familySupport">Family Educational Support</Label>
              <FieldTooltip content="Whether the student receives educational support from family" />
            </div>
            <Switch
              id="familySupport"
              checked={formData.familySupport}
              onCheckedChange={(checked) => setFormData({ ...formData, familySupport: checked })}
            />
          </div>

          {/* Absences */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>School Absences</Label>
                <FieldTooltip content="Number of school absences throughout the year (0-30)" />
              </div>
              <span className="text-sm font-medium text-primary">{formData.absences} days</span>
            </div>
            <Slider
              value={[formData.absences]}
              onValueChange={([value]) => setFormData({ ...formData, absences: value })}
              min={0}
              max={30}
              step={1}
            />
          </div>

          {/* Alcohol Consumption */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Alcohol Consumption Level</Label>
                <FieldTooltip content="Weekly alcohol consumption (1 = Very Low, 5 = Very High)" />
              </div>
              <span className="text-sm font-medium text-primary">
                {formData.alcoholConsumption === 1 && 'Very Low'}
                {formData.alcoholConsumption === 2 && 'Low'}
                {formData.alcoholConsumption === 3 && 'Moderate'}
                {formData.alcoholConsumption === 4 && 'High'}
                {formData.alcoholConsumption === 5 && 'Very High'}
              </span>
            </div>
            <Slider
              value={[formData.alcoholConsumption]}
              onValueChange={([value]) => setFormData({ ...formData, alcoholConsumption: value })}
              min={1}
              max={5}
              step={1}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Predict Performance'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
