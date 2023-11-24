import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Option,
  Select,
  Stack,
} from "@mui/joy";
import CategorySelect from "./CategorySelect";
import AccountSelect from "./AccountSelect";
import { Expense } from "../../interfaces/Expense";
import useLoading from "../../hooks/useLoading";
import { useFormik } from "formik";
import { useExpense } from "../../hooks/useExpense";
import { format } from "date-fns";
import { ExpenseType } from "../../interfaces/ExpenseType";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  expense: Expense;
}
function AddExpenseModal({ open, onClose, expense }: AddExpenseModalProps) {
  const { create, update } = useExpense();
  const { showProgress, loading } = useLoading();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...expense,
      categoryId: expense.category?.id,
      accountId: expense.account.id,
    },
    onSubmit: (data) => {
      const promise = (
        expense.id === ""
          ? create({ ...data })
          : update(expense.id, { ...data })
      ).then(() => onClose());
      showProgress(promise);
    },
  });
  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog>
          <DialogTitle>Add Expense</DialogTitle>
          <ModalClose />
          <Stack gap={1}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                fullWidth
                name="amount"
                placeholder="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Select
                placeholder={"Select Expense Type"}
                value={formik.values.type}
                onChange={(e, v) => formik.setFieldValue("type", v)}
              >
                {Object.entries(ExpenseType).map((entry) => (
                  <Option value={entry[1]}>{entry[1]}</Option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                fullWidth
                name="description"
                placeholder="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </FormControl>
            <Stack direction="row" gap={1} width="100%">
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                  placeholder="date"
                  type="date"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input
                  defaultValue={format(new Date(), "HH:mm")}
                  fullWidth
                  placeholder="date"
                  type="time"
                />
              </FormControl>
            </Stack>
            {formik.values.type === ExpenseType.EXPENSE && (
              <CategorySelect
                value={formik.values.categoryId!}
                onChange={(v) => formik.setFieldValue("categoryId", v)}
              />
            )}
            <AccountSelect
              value={formik.values.accountId}
              onChange={(v) => formik.setFieldValue("accountId", v)}
            />
            <Button loading={loading} onClick={() => formik.handleSubmit()}>
              Add Expense
            </Button>
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}

export default AddExpenseModal;
