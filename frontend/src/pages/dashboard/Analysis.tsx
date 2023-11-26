import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { LineChart, PieChart } from "@mui/x-charts";
import { useBudget } from "../../hooks/useBudget";
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/Category";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useExpense } from "../../hooks/useExpense";
import { Expense } from "../../interfaces/Expense";
import { ExpenseType } from "../../interfaces/ExpenseType";

function Analysis() {
  const budget = useBudget();
  const expense = useExpense();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [budgets, setBudgets] = useState<Category[]>([]);

  useEffect(() => {
    budget
      .getAll(month, new Date().getFullYear())
      .then((data) => setBudgets(data));
    expense.getAll().then((data) => setExpenses(data));
  }, [month]);

  const totalBudget = budgets.reduce((p, c) => p + (c.budget?.limit ?? 0), 0);

  const expenseTable = Object.entries(
    expenses.reduce((p, c) => {
      const date = c.date.split("T")[0];
      p[date] = [...(p[date] || []), c];
      return p;
    }, {} as { [date: string]: Expense[] })
  );

  const increaseMonth = () => setMonth(Math.min(month + 1, 11));
  const decreaseMonth = () => setMonth(Math.max(month - 1, 0));

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString([], { month: "long" });
  };

  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12}>
        <Stack
          direction="row"
          justifyContent="center"
          gap={3}
          alignItems="center"
        >
          <IconButton disabled={month == 0} onClick={decreaseMonth}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography level="title-lg">{getMonthName(month)}, 2023</Typography>
          <IconButton disabled={month == 11} onClick={increaseMonth}>
            <ArrowRightIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Card>
          <CardContent>
            <Typography level="title-lg">Budget Breakdown</Typography>
            <PieChart
              height={200}
              series={[
                {
                  data: budgets
                    .filter((b) => b.budget !== null)
                    .map((b) => ({
                      id: b.budget?.id,
                      value: ((b.budget?.limit ?? 0) / totalBudget) * 100,
                      label: b.name,
                    })),
                  innerRadius: 30,
                  outerRadius: 100,
                  cornerRadius: 3,
                },
              ]}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card>
          <CardContent>
            <Typography level="title-lg">Expense Tracking</Typography>
            {expenseTable.length > 0 && (
              <LineChart
                xAxis={[
                  {
                    data: expenseTable.map((e) => new Date(e[0])),
                    scaleType: "utc",
                  },
                ]}
                series={[
                  {
                    color: "red",
                    label: "expense",
                    data: expenseTable.map((e) =>
                      e[1].reduce(
                        (p, c) =>
                          p + (c.type === ExpenseType.EXPENSE ? c.amount : 0),
                        0
                      )
                    ),
                  },
                  {
                    color: "green",
                    label: "income",
                    data: expenseTable.map((e) =>
                      e[1].reduce(
                        (p, c) =>
                          p + (c.type === ExpenseType.INCOME? c.amount : 0),
                        0
                      )
                    ),
                  },
                ]}
                height={400}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Analysis;
