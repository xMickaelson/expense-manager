import { Navigate, Outlet } from "react-router-dom";
import AppNavigation from "../components/navigation/AppNavigation";
import AppHeader from "../components/header/AppHeader";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { NavigationRoute } from "../interfaces/NavigationRoute";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  Bars2Icon,
  CurrencyRupeeIcon,
  ListBulletIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const navigationRoutes: NavigationRoute[] = [
  {
    name: "expenses",
    path: "expenses",
    icon: <BanknotesIcon height={20} />,
  },
  {
    name: "analysis",
    path: "analysis",
    icon: <ArrowTrendingUpIcon height={20} />,
  },
  {
    name: "budgets",
    path: "budgets",
    icon: <WalletIcon height={20} />,
  },
  {
    name: "accounts",
    path: "accounts",
    icon: <CurrencyRupeeIcon height={20} />,
  },
  {
    name: "categories",
    path: "categories",
    icon: <ListBulletIcon height={20} />,
  },
];

function AppLayout() {
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(true);

  if (!user) return <Navigate to="/" />;

  return (
    <>
      <AppHeader>
        <AppHeader.Left>
          <Stack direction="row" alignItems="center" gap={2}>
            <IconButton
              sx={{ display: { xs: "none", sm: "block" } }}
              onClick={() => setExpanded((e) => !e)}
            >
              {<Bars2Icon height={20} />}
            </IconButton>
            <Typography level="h4">Expenso</Typography>
          </Stack>
        </AppHeader.Left>
        <AppHeader.Right>
          <Stack direction="row" alignItems="center" gap={2}>
            <Button onClick={() => logout()}>Logout</Button>
            <Avatar />
          </Stack>
        </AppHeader.Right>
      </AppHeader>
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        alignContent={"flex-start"}
        height={"calc(100% - 56px)"}
      >
        <AppNavigation routes={navigationRoutes} expanded={expanded} />
        <Container maxWidth="xl" sx={{ overflow: "auto", height: '100%' }}>
          <Outlet />
        </Container>
      </Stack>
    </>
  );
}

export default AppLayout;
