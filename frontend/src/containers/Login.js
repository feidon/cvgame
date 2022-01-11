import { UserContext } from "./App";
import { useContext } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Login = () => {
  const { UserData } = useContext(UserContext);

  return (
      <Box>
        <Typography>login</Typography>
        <Button href={`/login/${UserData.username}/lobby`} variant="contained">lobby</Button>
      </Box>
  );
};

export default Login;
