"use client";
// features page
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Header from "../components/Header";


const theme = createTheme({
  palette: {
    primary: {
      main: "#6e11e4", //  primary color
    },
    secondary: {
      main: "#ccacf7", // secondary color
    },
  },
});

const useStyles = makeStyles((theme) => ({
  section: {
    padding: "60px 0",
    minHeight: "100vh",
  },
  siteHeading: {
    marginBottom: "60px",
    overflow: "hidden",
    marginTop: "-5px",
  },
  siteHeadingH2: {
    display: "block",
    fontWeight: 700,
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  siteHeadingSpan: {
    color: "#6e11e4",
  },
  siteHeadingH4: {
    display: "inline-block",
    paddingBottom: "20px",
    position: "relative",
    textTransform: "capitalize",
    zIndex: 1,
  },
  siteHeadingH4Before: {
    background: "#6e11e4",
    bottom: 0,
    content: '""',
    height: "2px",
    left: "50%",
    marginLeft: "-25px",
    position: "absolute",
    width: "50px",
  },
  item: {
    padding: "15px 30px",
  },
  icon: {
    marginBottom: "20px",
  },
  iconCircle: {
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0 0 10px #cccccc",
    color: "#ffaf5a",
    display: "inline-block",
    fontSize: "30px",
    height: "100px",
    lineHeight: "100px",
    position: "relative",
    textAlign: "center",
    width: "100px",
    zIndex: 1,
  },
  infoH4: {
    fontWeight: 600,
    textTransform: "capitalize",
    fontSize: "20px",
  },
}));

function FeaturesPage() {
  const classes = useStyles();

  return (

    <>
<Header></Header>
    <ThemeProvider theme={theme}>
      <section className={classes.section}>
        <Container>
          <Box sx={{ textAlign: "center" }} className={classes.siteHeading}>
            <Typography variant="h2" className={classes.siteHeadingH2}>
              Our <span className={classes.siteHeadingSpan}>Features</span>
            </Typography>
            <Typography variant="h4" className={classes.siteHeadingH4}>
              Checkout our latest features
              <span className={classes.siteHeadingH4Before}></span>
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid sx={{ textAlign: "center" }} item xs={12} md={12}>
              <Box className={classes.item}>
                <Box className={classes.icon}>
                  <GroupsIcon sx={{ fontSize: "100px" }}></GroupsIcon>
                </Box>
                <Box>
                  <Typography variant="h4" className={classes.infoH4}>
                    Employee Information Management
                  </Typography>
                  <Typography variant="body1">
                    This includes storing and managing employee data such as
                    personal details, contact information, employment history,
                    skills, qualifications, and performance records.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid sx={{ textAlign: "center" }} item xs={12} md={12}>
              <Box className={classes.item}>
                <Box className={classes.icon}>
                  <LocalAtmIcon sx={{fontSize:"100px"}}></LocalAtmIcon>
                  <AcUnitIcon></AcUnitIcon>
                </Box>
                <Box>
                  <Typography variant="h4" className={classes.infoH4}>
                    Payroll Management
                  </Typography>
                  <Typography variant="body1">
                    This function involves processing employee salaries, wages,
                    bonuses, deductions, and taxes. It may also generate pay
                    slips and handle direct deposits.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid sx={{ textAlign: "center" }} item xs={12} md={12}>
              <Box className={classes.item}>
                <Box className={classes.icon}>
                  <GroupsIcon sx={{ fontSize: "100px" }}></GroupsIcon>
                </Box>
                <Box>
                  <Typography variant="h4" className={classes.infoH4}>
                  Time and Attendance Tracking
                  </Typography>
                  <Typography variant="body1">
                  This feature allows employees to log their working hours,
                  track attendance, manage leave requests, and monitor overtime.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    </ThemeProvider>
    </>
  );
}

export default FeaturesPage;