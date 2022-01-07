import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { USER_QUERY, USER_SUBSCRIPTION } from "../graphql";
import { FINGER_EXERCISE, FINGER_MATH, FINGER_MORA, POSE } from "../constants";

const TabPanel = (props) => {
  const { value, index, ...other } = props;
  const { loading, error, data, subscribeToMore } = useQuery(USER_QUERY, {
    variables: {
      game: index,
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: USER_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        console.log(subscriptionData.data);
        return {};
      },
    });
  });

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
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map(({ name, scores }) => (
                <TableRow key={name}>
                  <TableCell align="center">{name}</TableCell>
                  <TableCell align="center">
                    {scores.filter((e) => e === index).score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const LeaderBoard = (props) => {
  const [tabvalue, setTab] = useState("");

  const handleChange = (val) => {
    setTab(tabvalue);
  };

  return (
    <Box>
      <Tabs value={tabvalue} onChange={handleChange}>
        <Tab value={FINGER_MORA} label={FINGER_MORA} />
        <Tab value={FINGER_MATH} label={FINGER_MATH} />
        <Tab value={POSE} label={POSE} />
        <Tab value={FINGER_EXERCISE} label={FINGER_EXERCISE} />
      </Tabs>
      <TabPanel value={tabvalue} index={FINGER_MORA} />
      <TabPanel value={tabvalue} index={FINGER_MATH} />
      <TabPanel value={tabvalue} index={POSE} />
      <TabPanel value={tabvalue} index={FINGER_EXERCISE} />
    </Box>
  );
};

export default LeaderBoard;
