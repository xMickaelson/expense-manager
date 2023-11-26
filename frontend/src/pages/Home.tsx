import { Avatar, Button, Container, Stack, Typography } from "@mui/joy";
import AppHeader from "../components/header/AppHeader";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jdenticon from "jdenticon/standalone";

function Home() {
  const { loading, user } = useAuth();

  const NoUser = !user;
  const IsLoading = loading;

  return (
    <>
      <AppHeader>
        <AppHeader.Left>
          <Typography level="h4">Expenso</Typography>
        </AppHeader.Left>
        <AppHeader.Right>
          <Stack direction="row">
            {NoUser && (
              <NavLink to="/login">
                <Button variant="plain">Login / Sign Up</Button>
              </NavLink>
            )}
            {!NoUser && (
              <Avatar
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  jdenticon.toSvg(user.name, 100)
                )}`}
              />
            )}
          </Stack>
        </AppHeader.Right>
      </AppHeader>
      <Container>
        <Stack
          marginTop="6rem"
          alignItems="center"
          direction="column"
          gap="3rem"
        >
          <Typography fontSize={56} textAlign="center">
            Manage your expenses at <br /> your fingertips
          </Typography>
          {NoUser ? (
            <NavLink to="/register">
              <Button size="lg" loading={IsLoading}>
                Get Started
              </Button>
            </NavLink>
          ) : (
            <NavLink to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </NavLink>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default Home;
