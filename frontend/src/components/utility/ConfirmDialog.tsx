import {
  Button,
  DialogActions,
  DialogContent,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { ReactNode, useState } from "react";
import useLoading from "../../hooks/useLoading";

interface ConfirmDialogProps {
  confirm: string;
  confirmTitle?: string;
  children: (setOpen: (open: boolean) => void) => ReactNode;
  onConfirm: () => Promise<void>;
}
function ConfirmDialog({
  onConfirm,
  confirmTitle,
  confirm,
  children,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const { loading, showProgress } = useLoading();
  return (
    <>
      {children(setOpen)}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogContent>
            <Typography>{confirm}</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                const promise = onConfirm();
                showProgress(promise).then(() => setOpen(false));
              }}
            >
              {confirmTitle ?? "Ok"}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default ConfirmDialog;
