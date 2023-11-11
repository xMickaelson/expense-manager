import { Sheet, Stack } from "@mui/joy";
import { PropsWithChildren, ReactNode } from "react";

interface AppHeaderProps {
  children?: ReactNode;
}
function AppHeader(props: AppHeaderProps) {
  return (
    <Sheet
      component={"nav"}
      variant="outlined"
      sx={{
        width: "100%",
        marginX: "auto",
        height: 56,
        boxSizing: "border-box",
      }}
    >
      <Stack
        maxWidth={"xl"}
        height={"100%"}
        paddingX={"16px"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {props.children}
      </Stack>
    </Sheet>
  );
}

function Section(props: PropsWithChildren) {
  return <section>{props.children}</section>;
}

AppHeader.Left = Section;
AppHeader.Right = Section;

export default AppHeader;
