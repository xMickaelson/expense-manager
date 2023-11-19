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
import { Account } from "../../interfaces/Account";
import { useAccount } from "../../hooks/useAccount";
import { useFormik } from "formik";
import useLoading from "../../hooks/useLoading";
import { useEffect } from "react";

interface AddAccountModalProps {
  account: Account;
  open: boolean;
  onClose: () => void;
}
function AddAccountModal({ account, open, onClose }: AddAccountModalProps) {
  const { create, update } = useAccount();
  const { showProgress, loading } = useLoading();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: account.id,
      balance: account.balance,
      name: account.name,
    },
    onSubmit: (data) => {
      console.log(data);
      const promise = (
        account.id === ""
          ? create({ ...data })
          : update(account.id, { ...data })
      ).then(() => onClose());
      showProgress(promise);
    },
  });
  const IsNew = account.id === "";

  useEffect(() => {
    return () => formik.resetForm();
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{IsNew ? "New Account" : "Edit Account"}</DialogTitle>
          <Stack gap={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormControl>
          </Stack>
          <DialogActions>
            <Button
              disabled={!formik.dirty}
              loading={loading}
              onClick={() => formik.handleSubmit()}
            >
              {IsNew ? "Add Account" : "Update Account"}
            </Button>
          </DialogActions>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}

export default AddAccountModal;
