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

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showProgress, loading } = useLoading();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (data) => {
      const promise = auth
        .login(data.email, data.password)
        .then(() => navigate("/dashboard"))
        .catch((e) => toast(e.message));
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
          <Typography level="h3">Login</Typography>
          <CardContent>
            <Stack gap={2}>
              <Input
                placeholder="email"
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              ></Input>
              <Input
                placeholder="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              ></Input>
            </Stack>
          </CardContent>
          <CardActions orientation="vertical">
            <Button loading={loading} onClick={() => formik.handleSubmit()}>
              Login
            </Button>
            <NavLink to="/register">
              <Link>Not Registered? Sign Up</Link>
            </NavLink>
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
}

export default Login;
