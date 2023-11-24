import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/Category";
import { useBudget } from "../../hooks/useBudget";
import useLoading from "../../hooks/useLoading";
import AddBudgetModal from "../../components/budget/AddBudgetModal";

function Budgets() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [open, setOpen] = useState(false);
  const { getAll } = useBudget();
  const [dirty, setDirty] = useState(false);
  const { showProgress, loading } = useLoading();
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCateogry, setSelectedCategory] = useState<Category>(
    {} as Category
  );

  useEffect(() => {
    const promise = getAll(month, new Date().getFullYear()).then((data) =>
      setCategory(data)
    );
    showProgress(promise);
  }, [month, dirty]);

  const IsLoading = loading;

  const reload = () => setDirty((d) => !d);

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
      {IsLoading && (
        <Grid xs={12} justifyContent="center" container paddingTop={10}>
          <CircularProgress />
        </Grid>
      )}
      {category
        .sort((a, b) => (b.budget ? 1 : 0) - (a.budget ? 1 : 0))
        .map((b) => (
          <Grid xs={12} sm={4} lg={3} display="flex">
            <Card sx={{ width: "100%" }}>
              <CardContent orientation="horizontal">
                <Avatar src={b.emoji} size="sm" />
                <Typography level="title-lg">{b.name}</Typography>
              </CardContent>
              {b.budget && (
                <>
                  <Typography level="h2">${b.budget?.limit}</Typography>
                  <Box>
                    <LinearProgress determinate value={50} />
                  </Box>
                </>
              )}
              <CardActions>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setSelectedCategory(b);
                  }}
                >
                  {b.budget ? "Update Budget" : "Set Budget"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      <AddBudgetModal
        month={month}
        budget={selectedCateogry}
        open={open}
        onClose={() => {
          setOpen(false);
          reload();
        }}
      />
    </Grid>
  );
}

export default Budgets;
