import { Outlet } from "react-router-dom";
import AppNavigation from "../components/navigation/AppNavigation";
import AppHeader from "../components/header/AppHeader";
import { Avatar, Container, IconButton, Stack, Typography } from "@mui/joy";
import { Toaster } from "sonner";
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
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <AppHeader>
        <AppHeader.Left>
          <Stack direction='row' alignItems='center' gap={2}>
            <IconButton onClick={() => setExpanded((e) => !e)}>
              {<Bars2Icon height={20}/>}
            </IconButton>
            <Typography level="h4">Expenso</Typography>
          </Stack>
        </AppHeader.Left>
        <AppHeader.Right>
          <Avatar />
        </AppHeader.Right>
      </AppHeader>
      <Stack
        direction={"row"}
        alignContent={"flex-start"}
        height={"calc(100% - 56px)"}
      >
        <AppNavigation routes={navigationRoutes} expanded={expanded} />
        <Container maxWidth='xl'>
          <Outlet />
        </Container>
        <Toaster />
      </Stack>
    </>
  );
}

export default AppLayout;
