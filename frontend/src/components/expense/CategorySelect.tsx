import {
  CircularProgress,
  FormControl,
  FormLabel,
  Option,
  Select,
} from "@mui/joy";
import { useCategory } from "../../hooks/useCategory";
import { useEffect, useState } from "react";
import { Category } from "../../interfaces/Category";
import useLoading from "../../hooks/useLoading";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}
function CategorySelect({ value, onChange }: CategorySelectProps) {
  const { getAll } = useCategory();
  const [categories, setCategories] = useState<Category[]>([]);
  const { loading, showProgress } = useLoading();

  useEffect(() => {
    const promise = getAll().then((data) => setCategories(data));
    showProgress(promise);
  }, []);

  return (
    <FormControl>
      <FormLabel>Category</FormLabel>
      <Select
        value={value}
        onChange={(_, v) => onChange(v ?? "")}
        placeholder="Select a Category"
      >
        {loading && <CircularProgress size="sm" />}
        {categories.map((c) => (
          <Option value={c.id}>{c.name}</Option>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategorySelect;
