import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { NavLink } from "react-router-dom";
import { NavigationRoute } from "../../interfaces/NavigationRoute";

interface AppNavigationProps {
  routes?: NavigationRoute[];
  expanded?: boolean;
}
function AppNavigation(props: AppNavigationProps) {
  const { routes, expanded = true } = props;
  return (
    <Sheet
      component={"nav"}
      variant="outlined"
      sx={{
        width: { xs: "100%", sm: expanded ? "200px" : "56px" },
        boxSizing: "border-box",
        borderTop: { sm: 0 },
        transition: "125ms ease-in all",
      }}
    >
      <Stack justifyContent={"center"}>
        <List
          sx={{
            padding: { xs: 0, sm: "initial" },
            flexDirection: { xs: "row", sm: "column" },
          }}
        >
          {routes?.map((route) => {
            return (
              <NavLink
                to={route.path}
                style={{
                  textDecoration: "none",
                  color: "GrayText",
                  flexGrow: 1,
                }}
                key={route.path}
              >
                {({ isActive }) => (
                  <ListItem
                    sx={{
                      height: "56px",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        overflow: "hidden",
                        justifyContent: "center",
                      }}
                      selected={isActive}
                      color={isActive ? "primary" : "neutral"}
                    >
                      <ListItemDecorator>{route.icon}</ListItemDecorator>
                      <ListItemContent
                        sx={{
                          display: {
                            xs: "none",
                            sm: expanded ? "block" : "none",
                          },
                        }}
                      >
                        <Typography
                          textTransform="capitalize"
                          color={isActive ? "primary" : "neutral"}
                        >
                          {route.name}
                        </Typography>
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                )}
              </NavLink>
            );
          })}
        </List>
      </Stack>
    </Sheet>
  );
}

export default AppNavigation;
