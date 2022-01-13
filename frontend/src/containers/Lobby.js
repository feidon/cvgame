import { UserContext } from "./App";
import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Grid from '@mui/material/Grid';


const Lobby = () => {
  const { UserData, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(UserData)
  return (
    <Layout>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item>
            <GameCard
              imageURL={require("../img/Flappy_Bird_icon.png")}  // creeate-react-app的根目錄在public，所以要用require讀相對路徑
              title={"Pose Flappy Bird"}
              description={"It's a new version flappy bird! We use pose detection technology with your webcam to detect your pose. \
        You can control the bird flying by wave your arms !"}
              onClick={() => { navigate(`/login/${UserData.username}/pose-flappy-bird`) }}
            />
          </Grid>
          <Grid item>
            <GameCard
              imageURL={require("../img//Rock_Paper_Scissors_icon.png")}
              title={"Rock-Paper-Scissors"}
              description={"Use one of your hands to play rock-paper-scissors with the computer! The game is not finished yet ><"}
              onClick={() => { navigate(`/login/${UserData.username}/rock-paper-scissors`) }}
            />
          </Grid>
          <Grid item>
            {/* 新的GameCard加在Grid item裡 */}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Lobby;
