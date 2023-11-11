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

function Login() {
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
              <Input placeholder="email" type="text"></Input>
              <Input placeholder="password" type="password"></Input>
            </Stack>
          </CardContent>
          <CardActions orientation="vertical">
            <Button>Login</Button>
            <Link>Not Registered? Sign Up</Link>
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
}

export default Login;
