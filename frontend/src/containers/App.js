// import logo from "./logo.svg";
import "./App.css";
import LeaderBoard from "./LeaderBoard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import useUser from "../hooks/useUser";

function App() {
  const {
    UserData,
    game,
    time,
    timerOn,
    setUserData,
    setGame,
    setTime,
    setTimerOn,
    handleChangeUserData,
    handleCreate,
    handleLogin,
    handleUpdate,
    handleLogout,
  } = useUser();
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          <Box>
            <Typography>login</Typography>
            <Button href={`/login/${UserData.username}/lobby`}>lobby</Button>
          </Box>
        }
      />
      <Route
        path="/login/:username/leaderboard"
        element={<LeaderBoard UserData={UserData} />}
      />
      <Route
        path="/login/:username/lobby"
        element={
          <Box>
            <Typography>lobby</Typography>
            <Button href={`/login/${UserData.username}/leaderboard`}>
              leaderboard
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
