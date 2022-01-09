// import logo from "./logo.svg";
import "./App.css";
import LeaderBoard from "./LeaderBoard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import useUser from "../hooks/useUser";
import { createContext } from "react";
import Lobby from "./Lobby";
import Login from "./Login";

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
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/login/:username/leaderboard"
          element={<LeaderBoard UserData={UserData} />}
        />
        <Route path="/login/:username/lobby" element={<Lobby />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </UserContext.Provider>
  );
}

export { App, UserContext };
