import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Food: "bg-categories-food",
    Transport: "bg-categories-transport", 
    Education: "bg-categories-education",
    Entertainment: "bg-categories-entertainment",
    Shopping: "bg-categories-shopping",
    Income: "bg-secondary",
    Health: "bg-categories-health",
  };
  return colors[category] || "bg-muted";
};

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8">
            View All
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Latest transactions with AI categorization
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getCategoryColor(transaction.category)}/20`}>
                {transaction.amount > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-secondary" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-primary" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  <Badge 
                    variant="secondary" 
                    className="text-xs h-4 px-1"
                  >
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            </div>
            <div className={`font-semibold text-sm ${
              transaction.amount > 0 ? 'text-secondary' : 'text-foreground'
            }`}>
              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-primary-light/10 rounded-lg border border-primary-light">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Pattern Alert</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Coffee purchases increased 25% this week. Consider brewing at home to save $40/month.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};