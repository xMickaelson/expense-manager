import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/Category";
import { useCategory } from "../../hooks/useCategory";
import useLoading from "../../hooks/useLoading";
import AddCategoryModal from "../../components/category/AddCategoryModal";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAll } = useCategory();
  const { showProgress, loading } = useLoading();
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: "",
    name: "",
    emoji: "",
  });
  const [open, setOpen] = useState(false);

  const IsLoading = loading;

  useEffect(() => {
    const promise = getAll().then((data) => setCategories(data));
    showProgress(promise);
  }, []);

  return (
    <Grid container paddingTop="1.5rem" spacing={2}>
      <Grid xs={12} container alignItems="end">
        <Grid xs={12} sm={9}>
          <FormControl>
            <FormLabel>Search Categories</FormLabel>
            <Input />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={3}>
          <Button
            startDecorator={<PlusIcon height={25} />}
            onClick={() => setOpen((o) => !o)}
          >
            Add Category
          </Button>
          <AddCategoryModal
            open={open}
            onClose={() => setOpen(false)}
            category={selectedCategory}
          />
        </Grid>
      </Grid>
      {IsLoading && (
        <Grid xs={12} justifyContent="center" container paddingTop={10}>
          <CircularProgress />
        </Grid>
      )}
      {categories.map((c) => (
        <Grid xs={12} sm={4} md={3}>
          <Card>
            <CardContent orientation="horizontal">
              <Avatar src={c.emoji} size="sm" />
              <Typography level="title-lg">{c.name}</Typography>
            </CardContent>
            <CardActions orientation="horizontal-reverse">
              <IconButton
                onClick={() => {
                  setSelectedCategory(c);
                  setOpen(true);
                }}
                variant="soft"
                size="sm"
              >
                <PencilIcon height={16} />
              </IconButton>
              <IconButton variant="soft" size="sm">
                <TrashIcon height={16} />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Categories;
