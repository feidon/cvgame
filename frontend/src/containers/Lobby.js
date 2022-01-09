import { UserContext } from "./App";
import { useContext } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Lobby = () => {
  const { UserData, handleLogout } = useContext(UserContext);
  return (
    <Box>
      <Typography>lobby</Typography>
      <Button href={`/login/${UserData.username}/leaderboard`}>
        leaderboard
      </Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Lobby;
