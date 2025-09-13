import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface BudgetItem {
  category: string;
  amount: number;
  budget: number;
  icon: LucideIcon;
  color: string;
}

interface BudgetOverviewProps {
  expenses: BudgetItem[];
}

export const BudgetOverview = ({ expenses }: BudgetOverviewProps) => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="text-lg">Budget Tracking</CardTitle>
        <p className="text-sm text-muted-foreground">
          Smart categorization with AI insights
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense, index) => {
          const percentage = (expense.amount / expense.budget) * 100;
          const remaining = expense.budget - expense.amount;
          const Icon = expense.icon;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-light/20">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{expense.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${remaining.toFixed(2)} remaining
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    ${expense.amount} / ${expense.budget}
                  </div>
                  <Badge 
                    variant={percentage > 90 ? "destructive" : percentage > 70 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
              />
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-secondary-light/10 rounded-lg border border-secondary-light">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-secondary">AI Insight</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You're spending 18% less on food this month compared to average. 
            Consider allocating some savings to your emergency fund goal.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};