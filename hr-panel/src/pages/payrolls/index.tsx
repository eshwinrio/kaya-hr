import { ApolloQueryResult } from '@apollo/client';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC, useMemo } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import ActivePayslipsCard from '../../components/ActivePayslipsCard';
import OutstandingAmountCard from '../../components/OutstandingAmountCard';
import PayrollSummaryCard from '../../components/PayrollSummaryCard';
import { apolloClient } from "../../lib/apollo";
import dayjs from '../../lib/dayjs';
import { gql } from "../../lib/gql-codegen";
import { PayrollsIndexQuery } from '../../lib/gql-codegen/graphql';


const PayrollsIndex: FC = () => {
  const loaderData = useLoaderData() as PayrollsIndexLoader;
  const pageData = useMemo(() => loaderData.data.payrollsIndex, [loaderData.data.payrollsIndex]);

  if (!pageData) {
    return null;
  }

  return (
    <Container>
      <Toolbar disableGutters>
        <Box>
          <Typography variant="h6">Week {pageData.week} of {pageData.year}</Typography>
          <Typography variant="caption">
            Cycle: {dayjs(pageData.currentCycleStart).format('ddd, DD MMM')} - {dayjs(pageData.currentCycleEnd).format('ddd, DD MMM')}
          </Typography>
        </Box>
      </Toolbar>
      <Box sx={{ mt: 2 }}>
        <Grid2 container spacing={2} alignItems={"stretch"}>
          <Grid2 xs={12} lg={8}>
            <OutstandingAmountCard variant='outlined' data={pageData} />
          </Grid2>
          <Grid2 xs={12} sm={6} lg={4}>
            <PayrollSummaryCard variant='outlined' data={pageData.currentPayrollSummary} />
          </Grid2>
          <Grid2 xs={12} lg={8}>
            <ActivePayslipsCard variant='outlined' data={pageData} />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export const query = gql(`
  query PayrollsIndex {
    payrollsIndex {
      week
      year
      currentCycleStart
      currentCycleEnd
      currentPayrollSummary {
        ...PayrollSummaryCard
      }
      ...OutstandingAmountCard
      ...ActivePayslipsCard
    }
  }
`);

type PayrollsIndexLoader = Awaited<ApolloQueryResult<PayrollsIndexQuery>>;

export default PayrollsIndex;
export const payrollsIndexLoader: LoaderFunction = async () => await apolloClient.query({ query });

export { default as PayrollsView, viewPayrollLoader } from "./view";
