import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle,
  PlusCircle,
  Book,
  Car,
  Coffee,
  ShoppingBag,
  Gamepad2,
  Heart
} from "lucide-react";
import { ExpenseChart } from "./ExpenseChart";
import { BudgetOverview } from "./BudgetOverview";
import { GoalsSection } from "./GoalsSection";
import { RecentTransactions } from "./RecentTransactions";

const mockData = {
  totalBalance: 2450.75,
  monthlyBudget: 1200,
  spent: 875.25,
  savedThisMonth: 324.75,
  expenses: [
    { category: "Food", amount: 325.50, budget: 400, icon: Coffee, color: "categories-food" },
    { category: "Transport", amount: 180.75, budget: 200, icon: Car, color: "categories-transport" },
    { category: "Education", amount: 245.00, budget: 300, icon: Book, color: "categories-education" },
    { category: "Entertainment", amount: 89.50, budget: 150, icon: Gamepad2, color: "categories-entertainment" },
    { category: "Shopping", amount: 34.50, budget: 100, icon: ShoppingBag, color: "categories-shopping" },
  ],
  goals: [
    { name: "Emergency Fund", current: 1200, target: 2000, deadline: "Dec 2024" },
    { name: "New Laptop", current: 450, target: 800, deadline: "Nov 2024" },
    { name: "Spring Break", current: 200, target: 600, deadline: "Mar 2025" },
  ],
  recentTransactions: [
    { date: "Today", description: "Campus Cafe", amount: -12.50, category: "Food" },
    { date: "Yesterday", description: "Bus Pass", amount: -45.00, category: "Transport" },
    { date: "Sept 11", description: "Part-time Job", amount: +320.00, category: "Income" },
    { date: "Sept 10", description: "Textbook Store", amount: -89.99, category: "Education" },
    { date: "Sept 9", description: "Netflix", amount: -15.99, category: "Entertainment" },
  ]
};

export const FinanceDashboard = () => {
  const budgetUsed = (mockData.spent / mockData.monthlyBudget) * 100;
  const remainingBudget = mockData.monthlyBudget - mockData.spent;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Smart Finance Manager
            </h1>
            <p className="text-muted-foreground">
              AI-powered budgeting for students
            </p>
          </div>
          <Button className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ${mockData.totalBalance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockData.spent.toLocaleString()}
              </div>
              <div className="mt-2 space-y-1">
                <Progress value={budgetUsed} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {budgetUsed.toFixed(1)}% of ${mockData.monthlyBudget}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
              <TrendingDown className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                ${remainingBudget.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Until month end
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved This Month</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                ${mockData.savedThisMonth.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Great progress!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Banner */}
        {budgetUsed > 70 && (
          <Card className="border-warning bg-warning-light/10 shadow-soft">
            <CardContent className="flex items-center gap-3 pt-6">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <h3 className="font-semibold text-warning">Budget Alert</h3>
                <p className="text-sm text-muted-foreground">
                  You've used {budgetUsed.toFixed(1)}% of your monthly budget. Consider reviewing your spending.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ExpenseChart />
            <BudgetOverview expenses={mockData.expenses} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <GoalsSection goals={mockData.goals} />
            <RecentTransactions transactions={mockData.recentTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
};