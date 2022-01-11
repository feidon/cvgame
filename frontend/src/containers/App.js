// import logo from "./logo.svg";
import "./App.css";
import LeaderBoard from "./LeaderBoard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import useUser from "../hooks/useUser";
import { createContext } from "react";
import Lobby from "./Lobby";
import Login from "./Login";
import FlappyBirdGamePage from "./flappybird/GamePage";

const theme = createTheme({
  palette: {
    mode:"dark",
    primary: {
      main: '#8893ef',
    },
    secondary: {
      main: '#7f3b56',
    },
    background:{
      paper: '#303030',
      default: '#303030',
    }
  },
});

const UserContext = createContext();

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
    <UserContext.Provider
      value={{
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
      }}
    >
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/login/:username/leaderboard"
          element={<LeaderBoard UserData={UserData} />}
        />
        <Route path="/login/:username/lobby" element={<Lobby />} />
        <Route path="/login/:username/pose-flappy-bird" element={<FlappyBirdGamePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export { App, UserContext };
