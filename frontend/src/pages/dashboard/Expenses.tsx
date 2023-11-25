import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
  Stack,
  ToggleButtonGroup,
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
import { ExpenseMode } from "../../interfaces/ExpenseMode";
import { format } from "date-fns";

function Expenses() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ExpenseMode>(ExpenseMode.MONTHLY);
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

  const expense = expenses
    .filter((e) => e.type === ExpenseType.EXPENSE)
    .reduce((p, c) => p + c.amount, 0);
  const income = expenses
    .filter((e) => e.type === ExpenseType.INCOME)
    .reduce((p, c) => p + c.amount, 0);
  const net = income - expense;

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
            <ToggleButtonGroup
              color="primary"
              value={mode}
              onChange={(_, v) => setMode(v as ExpenseMode)}
            >
              <Button value={ExpenseMode.DAILY}>Daily</Button>
              <Button value={ExpenseMode.WEEKLY}>Weekly</Button>
              <Button value={ExpenseMode.MONTHLY}>Monthly</Button>
            </ToggleButtonGroup>
            <Button
              startDecorator={<PlusIcon height={20} />}
              onClick={() => {
                setOpen(true);
                setSelectedExpense({
                  id: "",
                  amount: 0,
                  description: "",
                  date: new Date().toISOString(),
                  type: ExpenseType.EXPENSE,
                  account: {} as Account,
                });
              }}
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
            {income < 0 ? "-" : ""}${Math.abs(income)}
          </Typography>
        </Card>
      </Grid>
      <Grid xs={6} sm={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Expenses
          </Typography>
          <Typography level="h2">
            {expense < 0 ? "-" : ""}${Math.abs(expense)}
          </Typography>
        </Card>
      </Grid>
      <Grid xs={12} sm={4}>
        <Card>
          <Typography level="body-md" color="neutral">
            Total
          </Typography>
          <Typography level="h2">
            {net < 0 ? "-" : ""}${Math.abs(net)}
          </Typography>
        </Card>
      </Grid>
      {IsLoading && (
        <Grid xs={12} justifyContent="center" container paddingTop={10}>
          <CircularProgress />
        </Grid>
      )}
      <Grid xs={12} rowGap={1}>
        {Object.entries(
          expenses.reduce((p, c) => {
            const date = c.date.split('T')[0]
            p[date] = [...(p[date] || []), c];
            return p;
          }, {} as { [date: string]: Expense[] })
        ).map(([date, expenseList]) => (
          <>
            <Typography color="neutral" level="title-md">{format(new Date(date), 'do MMMM')}</Typography>
            <List
              variant="outlined"
              sx={{ borderRadius: "md", overflow: "hidden", marginBottom: 2}}
            >
              {expenseList.map((e, index) => {
                const isExpense = e.type === ExpenseType.EXPENSE;
                return (
                  <>
                    <ListItem
                      endAction={
                        <Stack direction="row" gap={1}>
                          <IconButton
                            onClick={() => {
                              setOpen(true);
                              setSelectedExpense(e);
                            }}
                          >
                            <PencilIcon height={20} />
                          </IconButton>
                          <ConfirmDialog
                            confirm="Are you sure you want to delete this expense?"
                            onConfirm={async () =>
                              remove(e.id).then(() => reload())
                            }
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
                        {isExpense ? e.category?.name : e.account?.name}
                      </Typography>
                      <Typography
                        color={isExpense ? "danger" : "success"}
                        level="title-lg"
                      >
                        {isExpense ? "-" : "+"}${e.amount}
                      </Typography>
                    </ListItem>
                    {expenseList.length !== index + 1 && <ListDivider/>}
                  </>
                );
              })}
            </List>
          </>
        ))}
      </Grid>
    </Grid>
  );
}

export default Expenses;
