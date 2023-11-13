import { Button, Container, Stack, Typography } from "@mui/joy";
import AppHeader from "../components/header/AppHeader";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <AppHeader>
        <AppHeader.Left>
          <Typography level="h4">Expenso</Typography>
        </AppHeader.Left>
        <AppHeader.Right>
          <Stack direction="row">
            <NavLink to="/login">
              <Button variant="plain">Login / Sign Up</Button>
            </NavLink>
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
          <NavLink to="/register">
            <Button size="lg">Get Started</Button>
          </NavLink>
        </Stack>
      </Container>
    </>
  );
}

export default Home;
