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
  Stack,
} from "@mui/joy";
import { Category } from "../../interfaces/Category";
import { useCategory } from "../../hooks/useCategory";
import EmojiPicker, { EmojiStyle, SkinTones } from "emoji-picker-react";
import { useFormik } from "formik";
import useLoading from "../../hooks/useLoading";

interface AddCategoryModalProps {
  category: Category;
  open: boolean;
  onClose: () => void;
}
function AddCategoryModal({ category, open, onClose }: AddCategoryModalProps) {
  const { create, update } = useCategory();
  const { showProgress } = useLoading();
  const formik = useFormik({
    initialValues: {
      id: category.id,
      name: category.name,
      emoji: category.emoji,
    },
    onSubmit: (data) => {
      const promise =
        category.id === ""
          ? create({ ...data })
          : update(category.id, { ...data });
      showProgress(promise);
    },
  });
  const IsNew = category.id === "";
  return (
    <Modal open={open} onClose={onClose}>
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
          <Button onClick={() => formik.handleSubmit()}>
            {IsNew ? "Add Category" : "Update Category"}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

export default AddCategoryModal;
