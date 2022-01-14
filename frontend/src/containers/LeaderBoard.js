import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { USER_QUERY, USER_SUBSCRIPTION } from "../graphql";
import { UserContext } from "./App";
import Layout from "../components/Layout/Layout";

// Use these as game name
import { FINGER_EXERCISE, FINGER_MORA, POSE_FLAPPY_BIRD } from "../constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TabPanel = (props) => {
  const { value, index, ...other } = props;
  const { loading, error, data, subscribeToMore } = useQuery(USER_QUERY, {
    variables: {
      game: index,
    },
  });

  const gettime = (time) => {
    const minute = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const second = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const milsec = ("0" + ((time / 10) % 100)).slice(-2);
    return `${minute}:${second}:${milsec}`;
  };

  useEffect(() => {
    subscribeToMore({
      document: USER_SUBSCRIPTION,
      variables: { game: index },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return { users: subscriptionData.data.userUpdated.data };
      },
    });
  });

  if (data) console.log(data.users);
  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error! ${error.message}</Box>;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">
                  {index === POSE_FLAPPY_BIRD ? "Score" : "Time"}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.users.map(({ name, scores }) => (
                <StyledTableRow
                  key={name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="center">{name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {scores.map((e) => {
                      return e.game === index
                        ? e.game === POSE_FLAPPY_BIRD
                          ? e.score
                          : gettime(e.score)
                        : null;
                    })}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const LeaderBoard = (props) => {
  const [tabvalue, setTab] = useState(FINGER_MORA);
  const navigate = useNavigate();
  const { UserData } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "10%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/login/${UserData.username}/lobby`);
            }}
          >
            Back
          </Button>
        </Box>
        <Box
          sx={{
            width: "80%",
          }}
        >
          <Tabs value={tabvalue} onChange={handleChange} variant="fullWidth">
            <Tab value={FINGER_MORA} label={FINGER_MORA} />
            <Tab value={FINGER_EXERCISE} label={FINGER_EXERCISE} />
            <Tab value={POSE_FLAPPY_BIRD} label={POSE_FLAPPY_BIRD} />
          </Tabs>
          <TabPanel value={tabvalue} index={FINGER_MORA} />
          <TabPanel value={tabvalue} index={FINGER_EXERCISE} />
          <TabPanel value={tabvalue} index={POSE_FLAPPY_BIRD} />
        </Box>
      </Box>
    </Layout>
  );
};

export default LeaderBoard;
