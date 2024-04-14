import { ApolloQueryResult } from "@apollo/client";
import SourceIcon from '@mui/icons-material/Source';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import DashCard from "../../components/DashCard";
import { apolloClient } from "../../lib/apollo";
import { gql } from "../../lib/gql-codegen";
import { PayslipsIndexQuery } from "../../lib/gql-codegen/graphql";


const PayslipsIndex: FC = () => {
  const loaderData = useLoaderData() as PayslipsIndexLoader;
  const pageData = useMemo(() => loaderData.data.payslipsIndex, [loaderData.data.payslipsIndex]);

  if (!pageData) {
    return null;
  }

  return (
    <Container>
      <Toolbar disableGutters>
        <Typography variant="h6">Payslips</Typography>
      </Toolbar>
      <Box sx={{ mt: 2 }}>
        <Grid2 container spacing={2} alignItems={"stretch"}>
          <Grid2 xs={6} sm={4} lg={2}>
            <DashCard elevation={0}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <SourceIcon />
                <Typography variant="caption">Total Payslips</Typography>
                <Typography variant="h5">{pageData.totalPayslipCount}</Typography>
              </Box>
            </DashCard>
          </Grid2>
          <Grid2 xs={6} sm={4} lg={2}>
            <DashCard elevation={0}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <SourceIcon />
                <Typography variant="caption">Payslips This Period</Typography>
                <Typography variant="h5">{pageData.currentPeriodPayslipCount}</Typography>
              </Box>
            </DashCard>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export const query = gql(`
  query PayslipsIndex {
    payslipsIndex {
      totalPayslipCount
      currentPeriodPayslipCount
    }
  }
`);

type PayslipsIndexLoader = Awaited<ApolloQueryResult<PayslipsIndexQuery>>;
export const payslipsIndexLoader: LoaderFunction = async () => await apolloClient.query({ query });

export default PayslipsIndex;
export { default as PayslipsView, viewPayslipLoader } from "./view";
