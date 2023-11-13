import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLoading from "../hooks/useLoading";

function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showProgress, loading } = useLoading();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    onSubmit: (data) => {
      const promise = auth
        .register(data)
        .then(() => navigate("/login"))
        .catch(() => toast("Error Occurred"));
      showProgress(promise);
    },
  });
  return (
    <Container>
      <Stack
        maxWidth={500}
        marginX="auto"
        marginTop={{ xs: "3rem", sm: "8rem" }}
      >
        <Card size="lg">
          <Typography level="h3">Register</Typography>
          <CardContent>
            <Stack gap={2}>
              <Input
                placeholder="name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              ></Input>
              <Input
                placeholder="email"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></Input>
              <Input
                placeholder="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></Input>
            </Stack>
          </CardContent>
          <CardActions orientation="vertical">
            <Button loading={loading} onClick={() => formik.handleSubmit()}>Sign Up</Button>
            <NavLink to="/login">
              <Link>Already Registered? Login</Link>
            </NavLink>
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
}

export default Register;
