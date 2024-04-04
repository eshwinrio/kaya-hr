import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
import { Link, LoaderFunction } from "react-router-dom";
import PayrollSummary from '../components/PayrollSummary';


const FinancialsIndex: FC = () => {
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
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2" fontWeight={700}>Payroll Summary</Typography>
                <Typography variant="caption">Last generated 2 days ago</Typography>
              </Box>
              <IconButton size="small" component={Link} to="payrolls">
                <OpenInNewIcon fontSize='inherit' />
              </IconButton>
            </Toolbar>
            <PayrollSummary sx={{ px: 3, py: 2 }} />
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

export default FinancialsIndex;

export const financialHomePageLoader: LoaderFunction = async () => {
  return null;
};
