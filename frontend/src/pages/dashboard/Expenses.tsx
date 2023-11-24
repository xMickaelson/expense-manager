import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import AddExpenseModal from "../../components/expense/AddExpenseModal";
import { useEffect, useState } from "react";
import { Expense } from "../../interfaces/Expense";
import useLoading from "../../hooks/useLoading";
import { Account } from "../../interfaces/Account";
import { useExpense } from "../../hooks/useExpense";
import { ExpenseType } from "../../interfaces/ExpenseType";
import ConfirmDialog from "../../components/utility/ConfirmDialog";

function Expenses() {
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { getAll, remove } = useExpense();
  const { showProgress, loading } = useLoading();
  const [selectedExpense, setSelectedExpense] = useState<Expense>({
    id: "",
    amount: 0,
    description: "",
    date: new Date().toISOString(),
    type: ExpenseType.EXPENSE,
    account: {} as Account,
  });
  const [dirty, setDirty] = useState(true);

  const IsLoading = loading;

  useEffect(() => {
    const promise = getAll().then((data) => setExpenses(data));
    showProgress(promise);
  }, [dirty]);

  const reload = () => setDirty((d) => !d);

  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Typography
            level="title-lg"
            color="neutral"
            width={{ xs: "100%", sm: "initial" }}
          >
            {new Date().toDateString()}
          </Typography>
          <Stack gap={1} direction="row" alignItems="center" flexWrap={"wrap"}>
            <ButtonGroup>
              <Button>Daily</Button>
              <Button>Weekly</Button>
              <Button>Monthly</Button>
            </ButtonGroup>
            <Button
              startDecorator={<PlusIcon height={20} />}
              onClick={() => setOpen(true)}
            >
              Add a Expense
            </Button>
            <AddExpenseModal
              expense={selectedExpense}
              open={open}
              onClose={() => {
                setOpen(false);
                reload();
              }}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={6} sm={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Income
          </Typography>
          <Typography level="h2">
            $
            {expenses
              .filter((e) => e.type === ExpenseType.INCOME)
              .reduce((p, c) => p + c.amount, 0)}
          </Typography>
        </Card>
      </Grid>
      <Grid xs={6} sm={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Expenses
          </Typography>
          <Typography level="h2">
            $
            {expenses
              .filter((e) => e.type === ExpenseType.EXPENSE)
              .reduce((p, c) => p + c.amount, 0)}
          </Typography>
        </Card>
      </Grid>
      <Grid xs={12} sm={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Total
          </Typography>
          <Typography level="h2">
            $
            {expenses.reduce(
              (p, c) =>
                p + (c.type === ExpenseType.EXPENSE ? -1 : 1) * c.amount,
              0
            )}
          </Typography>
        </Card>
      </Grid>
      {IsLoading && (
        <Grid xs={12} justifyContent="center" container paddingTop={10}>
          <CircularProgress />
        </Grid>
      )}
      <Grid xs={12}>
        <List
          variant="outlined"
          sx={{ borderRadius: "md", overflow: "hidden" }}
        >
          {expenses.map((e) => {
            const isExpense = e.type === ExpenseType.EXPENSE;
            return (
              <>
                <ListItem
                  endAction={
                    <Stack direction="row" gap={1}>
                      <IconButton
                        onClick={() => {
                          setOpen(true)
                          setSelectedExpense(e);
                        }}
                      >
                        <PencilIcon height={20} />
                      </IconButton>
                      <ConfirmDialog
                        confirm="Are you sure you want to delete this expense?"
                        onConfirm={async () => remove(e.id)}
                        confirmTitle="Delete"
                      >
                        {(setOpen) => (
                          <IconButton
                            color="danger"
                            onClick={() => setOpen(true)}
                          >
                            <TrashIcon height={20} />
                          </IconButton>
                        )}
                      </ConfirmDialog>
                    </Stack>
                  }
                >
                  <ListItemDecorator>
                    <Avatar
                      size="sm"
                      src={
                        isExpense
                          ? e.category?.emoji
                          : "https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/1f4b5.png"
                      }
                    ></Avatar>
                  </ListItemDecorator>
                  <Typography level="title-lg">
                    {isExpense ? e.category?.name : e.account.name}
                  </Typography>
                  <Typography
                    color={isExpense ? "danger" : "success"}
                    level="title-lg"
                  >
                    {isExpense ? "-" : "+"}${e.amount}
                  </Typography>
                </ListItem>
                <ListDivider />
              </>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}

export default Expenses;
