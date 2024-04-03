import AcUnitIcon from '@mui/icons-material/AcUnit';
import GroupsIcon from "@mui/icons-material/Groups";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Box, Container, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from "react";

function FeaturesPage() {
  return (
    <Container>
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h2" style={{ textTransform: "uppercase", marginBottom: "10px" }}>
          Our <span style={{ color: "#6e11e4" }}>Features</span>
        </Typography>
        <Typography variant="h4">Checkout our latest features</Typography>
      </Box>

      <Grid2 container spacing={4}>
        <Grid2 sx={{ textAlign: "center" }} item xs={12} md={12}>
          <Box sx={{
            padding: "15px 30px",
          }}>
            <Box sx={{
              marginBottom: "20px",
            }}>
              <GroupsIcon sx={{ fontSize: "100px" }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                fontSize: "20px",
              }}>
                Employee Information Management
              </Typography>
              <Typography variant="body1">
                This includes storing and managing employee data such as
                personal details, contact information, employment history,
                skills, qualifications, and performance records.
              </Typography>
            </Box>
          </Box>
        </Grid2>
        <Grid2 sx={{ textAlign: "center" }} item xs={12} md={12}>
          <Box sx={{
            padding: "15px 30px",
          }}>
            <Box sx={{
              marginBottom: "20px",
            }}>
              <LocalAtmIcon sx={{ fontSize: "100px" }} />
              <AcUnitIcon />
            </Box>
            <Box>
              <Typography variant="h4" sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                fontSize: "20px",
              }}>
                Payroll Management
              </Typography>
              <Typography variant="body1">
                This function involves processing employee salaries, wages,
                bonuses, deductions, and taxes. It may also generate pay
                slips and handle direct deposits.
              </Typography>
            </Box>
          </Box>
        </Grid2>
        <Grid2 sx={{ textAlign: "center" }} item xs={12} md={12}>
          <Box sx={{
            padding: "15px 30px",
          }}>
            <Box sx={{
              marginBottom: "20px",
            }}>
              <GroupsIcon sx={{ fontSize: "100px" }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                fontSize: "20px",
              }}>
                Time and Attendance Tracking
              </Typography>
              <Typography variant="body1">
                This feature allows employees to log their working hours,
                track attendance, manage leave requests, and monitor overtime.
              </Typography>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default FeaturesPage;
