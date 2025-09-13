import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Plus } from "lucide-react";

interface Goal {
  name: string;
  current: number;
  target: number;
  deadline: string;
}

interface GoalsSectionProps {
  goals: Goal[];
}

export const GoalsSection = ({ goals }: GoalsSectionProps) => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Financial Goals
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8">
            <Plus className="h-3 w-3 mr-1" />
            Add Goal
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Track your savings progress
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => {
          const percentage = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          
          return (
            <div key={index} className="space-y-3 p-4 rounded-lg bg-gradient-card border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{goal.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Due: {goal.deadline}
                  </p>
                </div>
                <Badge 
                  variant={percentage >= 100 ? "default" : "secondary"}
                  className="bg-secondary text-secondary-foreground"
                >
                  {percentage.toFixed(0)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-3"
                />
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    ${goal.current.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">
                    ${goal.target.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {percentage < 100 && (
                <div className="text-xs text-muted-foreground">
                  ${remaining.toLocaleString()} to go
                </div>
              )}
            </div>
          );
        })}
        
        <div className="mt-4 p-3 bg-accent-light/10 rounded-lg border border-accent-light">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">Smart Suggestion</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Save $15 more weekly to reach your laptop goal on time!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};