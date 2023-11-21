import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/Category";
import { useBudget } from "../../hooks/useBudget";
import useLoading from "../../hooks/useLoading";
import AddBudgetModal from "../../components/budget/AddBudgetModal";

function Budgets() {
  const [month, setMonth] = useState(0);
  const [open, setOpen] = useState(false);
  const { getAll } = useBudget();
  const { showProgress } = useLoading();
  const [budgets, setBudgets] = useState<Category[]>([]);

  useEffect(() => {
    setMonth(new Date().getMonth());
  }, []);

  useEffect(() => {
    const promise = getAll(month, new Date().getFullYear()).then((data) =>
      setBudgets(data)
    );
    showProgress(promise);
  }, [month]);

  const increaseMonth = () => setMonth(Math.min(month + 1, 11));
  const decreaseMonth = () => setMonth(Math.max(month - 1, 0));

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString([], { month: "long" });
  };

  return (
    <Grid container paddingTop={"1.5rem"} spacing={2}>
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
      {budgets.map((b) => (
        <Grid xs={12} sm={4} lg={3}>
          <Card>
            <CardContent orientation="horizontal">
              <Avatar src={b.emoji} size="sm" />
              <Typography level="title-lg">{b.name}</Typography>
            </CardContent>
            <CardActions>
              {!b.budget && (
                <>
                  <Button onClick={() => setOpen(true)}>Set Budget</Button>
                  <AddBudgetModal budget={b} open={open} onClose={() => setOpen(false)}/>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Budgets;
