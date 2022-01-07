// import logo from "./logo.svg";
import "./App.css";
import LeaderBoard from "./LeaderBoard";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Box>login</Box>} />
      <Route path="/login/:username/leaderboard" element={<LeaderBoard />} />
      <Route path="/login/:username/lobby" element={<Box>lobby</Box>} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
