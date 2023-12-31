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
import { Category } from "../../interfaces/Category";
import { useCategory } from "../../hooks/useCategory";
import EmojiPicker, { EmojiStyle, SkinTones } from "emoji-picker-react";
import { useFormik } from "formik";
import useLoading from "../../hooks/useLoading";
import { useEffect } from "react";

interface AddCategoryModalProps {
  category: Category;
  open: boolean;
  onClose: () => void;
}
function AddCategoryModal({ category, open, onClose }: AddCategoryModalProps) {
  const { create, update } = useCategory();
  const { showProgress, loading } = useLoading();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: category.id,
      name: category.name,
      emoji: category.emoji,
    },
    onSubmit: (data) => {
      console.log(data);
      const promise = (
        category.id === ""
          ? create({ ...data })
          : update(category.id, { ...data })
      ).then(() => onClose());
      showProgress(promise);
    },
  });
  const IsNew = category.id === "";

  useEffect(() => {
    return () => formik.resetForm();
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{IsNew ? "New Category" : "Edit Category"}</DialogTitle>
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
            <FormControl>
              <FormLabel>Icon</FormLabel>
              <Input disabled placeholder="icon" value={formik.values.emoji} />
            </FormControl>
            <EmojiPicker
              onEmojiClick={(emoji) =>
                formik.setFieldValue("emoji", emoji.imageUrl)
              }
              previewConfig={{ showPreview: false }}
              emojiStyle={EmojiStyle.GOOGLE}
              defaultSkinTone={SkinTones.NEUTRAL}
              skinTonesDisabled
            />
          </Stack>
          <DialogActions>
            <Button
              disabled={!formik.dirty}
              loading={loading}
              onClick={() => formik.handleSubmit()}
            >
              {IsNew ? "Add Category" : "Update Category"}
            </Button>
          </DialogActions>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}

export default AddCategoryModal;
