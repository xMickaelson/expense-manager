import {
  Button,
  DialogActions,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
} from "@mui/joy";
import { useBudget } from "../../hooks/useBudget";
import { useFormik } from "formik";
import useLoading from "../../hooks/useLoading";
import { useEffect } from "react";
import { Category } from "../../interfaces/Category";

interface AddBudgetModalProps {
  budget: Category;
  month: number;
  open: boolean;
  onClose: () => void;
}
function AddBudgetModal({ month, budget, open, onClose }: AddBudgetModalProps) {
  const { create, update } = useBudget();
  const { showProgress, loading } = useLoading();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: budget.budget?.id ?? "",
      limit: budget.budget?.limit ?? 0,
      month: budget.budget?.month ?? month,
      year: budget.budget?.year ?? new Date().getFullYear(),
    },
    onSubmit: (data) => {
      const promise = (
        (budget.budget?.id ?? "") === "" ? create(budget?.id, { ...data }) : update(budget.budget!.id, { ...data })
      ).then(() => onClose());
      showProgress(promise);
    },
  });
  const IsNew = (budget.budget?.id ?? "") === "";

  useEffect(() => {
    return () => formik.resetForm();
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{IsNew ? "Set Budget" : "Edit Budget"}</DialogTitle>
          <Stack gap={2}>
            <FormControl>
              <FormLabel>Limit</FormLabel>
              <Input
                placeholder="limit"
                name="limit"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.limit}
              />
            </FormControl>
          </Stack>
          <DialogActions>
            <Button
              disabled={!formik.dirty}
              loading={loading}
              onClick={() => formik.handleSubmit()}
            >
              {IsNew ? "Add Budget" : "Update Budget"}
            </Button>
          </DialogActions>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}

export default AddBudgetModal;
