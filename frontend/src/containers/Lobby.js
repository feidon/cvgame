import { UserContext } from "./App";
import { useContext } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";


const Lobby = () => {
  const { UserData, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Box>
      <Typography>lobby</Typography>
      <GameCard
        imageURL={[require("../img/Flappy_Bird_icon.png")]}  // creeate-react-app的根目錄在public，所以要用require讀相對路徑
        title={"Pose Flappy Bird"}
        description={"It's a new version flappy bird! We use pose detection technology with your webcam to detect your pose. \
        You can control the bird flyying by wave your arms !"}
        onClick={() => { navigate(`/login/${UserData.username}/pose-flappy-bird`) }}
      />
      <GameCard
        imageURL={[require("../img//Rock_Paper_Scissors_icon.png")]}
        title={"Rock-Paper-Scissors"}
        description={"Use one of your hands to play rock-paper-scissors with the computer! The game is not finished yet ><"}
        onClick={() => { navigate(`/login/${UserData.username}/rock-paper-scissors`) }}
      />
      <Button href={`/login/${UserData.username}/leaderboard`} variant="contained">
        leaderboard
      </Button>
      <Button onClick={handleLogout} variant="contained">Logout</Button>
    </Box>
  );
};

export default Lobby;
