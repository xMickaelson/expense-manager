import { PlusIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/Category";
import { useCategory } from "../../hooks/useCategory";
import useLoading from "../../hooks/useLoading";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAll } = useCategory();
  const { showProgress, loading } = useLoading();

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
          <Button startDecorator={<PlusIcon height={25} />}>
            Add Category
          </Button>
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
            <CardContent>
              <Typography>{c.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Categories;
