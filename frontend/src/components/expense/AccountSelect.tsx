import { CircularProgress, FormControl, FormLabel, Option, Select } from "@mui/joy";
import { useAccount } from "../../hooks/useAccount";
import { Account } from "../../interfaces/Account";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";

interface AccountSelectProps {
  value: string;
  onChange: (value: string) => void;
}
function AccountSelect({ value, onChange }: AccountSelectProps) {
  const { getAll } = useAccount();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { loading, showProgress } = useLoading();

  useEffect(() => {
    const promise = getAll().then((data) => setAccounts(data));
    showProgress(promise);
  }, []);
  return (
    <FormControl>
      <FormLabel>Account</FormLabel>
      <Select
        value={value}
        onChange={(e, v) => onChange(v ?? "")}
        placeholder="Select a Account"
      >
        {loading && <CircularProgress size="sm" />}
        {accounts.map((a) => (
          <Option value={a.id}>{a.name}</Option>
        ))}
      </Select>
    </FormControl>
  );
}

export default AccountSelect;
