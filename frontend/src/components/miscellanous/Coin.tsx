import { BanknotesIcon } from "@heroicons/react/20/solid";
import { Box, useTheme } from "@mui/joy";
import { motion as Motion } from "framer-motion";

function Coin() {
  const theme = useTheme();
  return (
    <Motion.div
      style={{
        width: "7rem",
        height: "7rem",
        position: "relative",
        transformStyle: "preserve-3d",
      }}
      animate={{ rotateY: "360deg" }}
      transition={{ ease: "linear", duration: 4, repeat: Infinity }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.warning[400],
          transform: "translateZ(-0.005em)",
        }}
        position="absolute"
        borderRadius={500}
        height="7rem"
        width="7rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <BanknotesIcon height={50} color={theme.palette.common.white} />
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.warning[300],
          transform: "translateZ(-0.775em)",
        }}
        position="absolute"
        borderRadius={500}
        height="7rem"
        width="7rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <BanknotesIcon height={50} color={theme.palette.common.white} />
      </Box>
    </Motion.div>
  );
}

export default Coin;
