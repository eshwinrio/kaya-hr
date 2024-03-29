import ReceiptIcon from '@mui/icons-material/Receipt';
import { Avatar, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC } from "react";
import { LoaderFunction } from "react-router-dom";
import { apolloClient } from "../lib/apollo";
import { gql } from "../lib/gql-codegen";

const PayrollsPage: FC = () => {

  return (
    <Container>
      <Toolbar disableGutters>
        <Typography variant="h6">Payrolls</Typography>
      </Toolbar>
      <Grid2 container spacing={2} alignItems={"stretch"}>
        <Grid2 xs={12} lg={8}>
          <Paper variant="outlined" sx={{ height: "100%" }}>
            <Toolbar>Total Outstanding</Toolbar>
            <Box sx={{ px: 3, pb: 2 }}>
              <Typography variant="h5" fontWeight={700}>$9870.00</Typography>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 xs={12} sm={6} lg={4}>
          <Paper variant="outlined" sx={{ height: "100%" }}>
            <Toolbar>
              <Box>
                <Typography variant="body2" fontWeight={700}>Payroll Summary</Typography>
                <Typography variant="caption">Last generated 2 days ago</Typography>
              </Box>
            </Toolbar>
            <Box sx={{ px: 3, py: 2 }}>
              <Grid2 container spacing={2}>
                <Grid2 xs={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", borderLeft: "3px solid #e0e0e0", pl: 1 }}>
                    <Typography variant="caption">Payment</Typography>
                    <Typography variant="subtitle2">$9870.00</Typography>
                  </Box>
                </Grid2>
                <Grid2 xs={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", borderLeft: "3px solid #ff9800", pl: 1 }}>
                    <Typography variant="caption">Pending</Typography>
                    <Typography variant="subtitle2">$9870.00</Typography>
                  </Box>
                </Grid2>
                <Grid2 xs={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", borderLeft: "3px solid #4caf50", pl: 1 }}>
                    <Typography variant="caption">Paid</Typography>
                    <Typography variant="subtitle2">$0.00</Typography>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 xs={12} lg={8}>
          <Paper variant="outlined" sx={{ height: "100%" }}>
            <Toolbar>
              <Box>
                <Typography variant="body2" fontWeight={700}>Transaction History</Typography>
                <Typography variant="caption">Showing all</Typography>
              </Box>
            </Toolbar>
            <List dense>
              {[
                { name: "John Doe", date: "Mar 23, 2022", time: "10:00 AM", amount: "$134.00", status: "Paid" },
                { name: "John Doe", date: "Mar 23, 2022", time: "10:00 AM", amount: "$134.00", status: "Paid" },
                { name: "John Doe", date: "Mar 23, 2022", time: "10:00 AM", amount: "$134.00", status: "Paid" },
                { name: "John Doe", date: "Mar 23, 2022", time: "10:00 AM", amount: "$134.00", status: "Paid" },
              ].map(payroll => {
                return (
                  <ListItem
                    secondaryAction={
                      <Tooltip title="Invoice">
                        <IconButton>
                          <ReceiptIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: "primary.main" }}>J</Avatar>
                      </ListItemIcon>
                      <ListItemText primary="John Doe" secondary="Payroll" />
                      <ListItemText primary="Mar 23, 2022" secondary="10:00 AM" sx={{ display: { xs: 'none', sm: 'block' } }} /> <ListItemText primary="10:00 AM" sx={{ display: { xs: 'none' } }} />
                      <ListItemText primary="$134.00" secondary="Paid" sx={{ display: { xs: 'none', md: 'block' } }} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </Grid2>
        <Grid2 container xs={12} lg={4} alignContent="flex-start">
          <Grid2 xs={12}>
            <Paper variant="outlined">
              <Toolbar>
                <Box>
                  <Typography variant="body2" fontWeight={700}>Previous Payroll</Typography>
                  <Typography variant="caption">2 weeks ago</Typography>
                </Box>
              </Toolbar>
              <Box sx={{ px: 3, py: 2 }}>
                <Typography variant="h5" fontWeight={700}>$11,870.00</Typography>
              </Box>
            </Paper>
          </Grid2>
          <Grid2 xs={12}>
            <Paper variant="outlined">
              <Toolbar>
                <Box>
                  <Typography variant="body2" fontWeight={700}>Upcoming Payroll</Typography>
                  <Typography variant="caption">in 9 days</Typography>
                </Box>
              </Toolbar>
              <Box sx={{ px: 3, py: 2 }}>
                <Typography variant="h5" fontWeight={700}>$11,870.00</Typography>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default PayrollsPage;

export const LOAD_ALL_PAYROLLS = gql(`
  query LoadAllPayrolls {
    payrolls {
      id
      employee {
        id
        firstName
        lastName
      }
      periodStart
      periodEnd
      generatedOn
      dispensedOn
      deductions
      netPay
      paymentMethod
    }
  }
`);

export const payrollsPageLoader: LoaderFunction = async () => {
  return apolloClient.query({ query: LOAD_ALL_PAYROLLS });
};
