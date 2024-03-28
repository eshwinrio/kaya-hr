import { ApolloQueryResult } from '@apollo/client';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC, useMemo } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import PayrollSummary from '../components/PayrollSummary';
import { apolloClient } from "../lib/apollo";
import dayjs from '../lib/dayjs';
import { gql } from "../lib/gql-codegen";
import { CurrentPayrollPeriodQuery, LoadAllPayrollsQuery } from '../lib/gql-codegen/graphql';


const PayrollsIndex: FC = () => {
  const loaderData = useLoaderData() as PayrollsIndexLoader;
  const payrollPeriod = useMemo(() => loaderData.payrollPeriod.data.payrollPeriods, [loaderData.payrollPeriod.data.payrollPeriods]);

  return (
    <Container>
      <Toolbar disableGutters>
        <Box>
          <Typography variant="h6">Week {dayjs().week()} of {dayjs().format('YYYY')}</Typography>
          <Typography variant="caption">
            Current cycle: {dayjs(payrollPeriod?.startsOn).format('ddd, DD MMM')} - {dayjs(payrollPeriod?.endsOn).format('ddd, DD MMM')}
          </Typography>
        </Box>
      </Toolbar>
      <Box sx={{ mt: 2 }}>
        <Grid2 container spacing={2} alignItems={"stretch"}>
          <Grid2 xs={12} lg={8}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardHeader
                title="$9870.00"
                subheader="Amount outstanding"
              />
              <CardContent>
                <Typography variant="h5" fontWeight={700}>$9870.00</Typography>
                <div id="payment-button-container"></div>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 xs={12} sm={6} lg={4}>
            <Paper variant="outlined" sx={{ height: "100%" }}>
              <Toolbar>
                <Box>
                  <Typography variant="body2" fontWeight={700}>Payroll Summary</Typography>
                  <Typography variant="caption">Last generated 2 days ago</Typography>
                </Box>
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
                  <Typography variant="h5" fontWeight={700}>$8,870.00</Typography>
                </Box>
              </Paper>
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default PayrollsIndex;

export const LOAD_ALL_PAYROLLS = gql(`
  query LoadAllPayrolls {
    payrolls {
      id
      netOutstanding
      generatedOn
      organization {
        name
        logoUrl
      }
      payslips {
        dispensedOn
      }
    }
  }
`);

export const currentPayrollPeriodQuery = gql(`
  query CurrentPayrollPeriod {
    payrollPeriods {
      startsOn
      endsOn
    }
  }
`);

interface PayrollsIndexLoader {
  readonly payrolls: Awaited<ApolloQueryResult<LoadAllPayrollsQuery>>;
  readonly payrollPeriod: Awaited<ApolloQueryResult<CurrentPayrollPeriodQuery>>;
}

export const payrollsPageLoader: LoaderFunction = async () => {
  return {
    payrolls: await apolloClient.query({ query: LOAD_ALL_PAYROLLS }),
    payrollPeriod: await apolloClient.query({ query: currentPayrollPeriodQuery }),
  };
};
