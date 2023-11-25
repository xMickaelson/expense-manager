import {
  CurrencyRupeeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { Account } from "../../interfaces/Account";
import { useEffect, useState } from "react";
import { useAccount } from "../../hooks/useAccount";
import useLoading from "../../hooks/useLoading";
import ConfirmDialog from "../../components/utility/ConfirmDialog";
import AddAccountModal from "../../components/account/AddAccountModal";

function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { getAll, remove } = useAccount();
  const { showProgress, loading } = useLoading();
  const [selectedAccount, setSelectedAccount] = useState<Account>({
    id: "",
    balance: 0,
    name: "",
  });
  const [open, setOpen] = useState(false);
  const [dirty, setDirty] = useState(true);

  const IsLoading = loading;

  useEffect(() => {
    const promise = getAll().then((data) => setAccounts(data));
    showProgress(promise);
  }, [dirty]);

  const accountBalance = accounts.reduce((p, c) => p + c.balance, 0)

  const reload = () => setDirty((d) => !d);

  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12}>
        <Card>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography level="title-md" color="neutral">
                  Available Balance
                </Typography>
                <Typography level="h2">
                  {accountBalance < 0 ? "-": ""}${Math.abs(accountBalance)}
                </Typography>
              </Box>
              <Button
                onClick={() => {
                  setOpen((o) => !o);
                }}
                startDecorator={<PlusIcon height={20} />}
              >
                Add Account
              </Button>
              <AddAccountModal
                open={open}
                account={selectedAccount}
                onClose={() => {
                  setOpen(false);
                  reload();
                }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {IsLoading && (
        <Grid xs={12} justifyContent="center" container paddingTop={10}>
          <CircularProgress />
        </Grid>
      )}
      {accounts.map((a) => (
        <Grid xs={12} sm={4} md={3}>
          <Card variant="solid" color="primary" invertedColors>
            <CardContent>
              <Typography
                level="title-sm"
                startDecorator={<CurrencyRupeeIcon height={20} />}
              >
                {a.name}
              </Typography>
              <Typography level="h3" paddingY="1rem">
                {a.balance < 0 ? "-": ""}${Math.abs(a.balance)}
              </Typography>
            </CardContent>
            <CardActions orientation="horizontal-reverse">
              <IconButton
                onClick={() => {
                  setOpen(true);
                  setSelectedAccount(a);
                }}
                variant="soft"
                size="sm"
              >
                <PencilIcon height={16} />
              </IconButton>
              <ConfirmDialog
                confirm="Are you sure you want to delete this accounts?"
                onConfirm={() => remove(a.id).then(() => reload())}
              >
                {(setOpen) => (
                  <IconButton
                    variant="soft"
                    size="sm"
                    onClick={() => setOpen(true)}
                  >
                    <TrashIcon height={16} />
                  </IconButton>
                )}
              </ConfirmDialog>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Accounts;
