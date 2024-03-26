import { ApolloQueryResult } from "@apollo/client";
import PunchClockIcon from '@mui/icons-material/PunchClock';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import { ActionFunction, Form, LoaderFunction, useLoaderData } from "react-router-dom";
import PunchHistoryListItem from "../components/PunchHistoryItem";
import Timer from "../components/Timer";
import { apolloClient } from "../lib/apollo";
import { gql } from "../lib/gql-codegen";
import { ListPunchesQuery } from "../lib/gql-codegen/graphql";
import { useMaterialTheme } from "../lib/material-theme";


const PunchPage: FC = () => {
  const theme = useMaterialTheme();
  const loaderData = useLoaderData() as Awaited<PunchPageLoader>;
  const punches = useMemo(() => loaderData?.punches, [loaderData?.punches]);
  const active = useMemo(() => punches?.data.listPunches.active[0], [punches?.data.listPunches.active]);
  const history = useMemo(() => punches?.data.listPunches.history, [punches?.data.listPunches.history]);

  if (!loaderData) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>

      {/* Clock in/out */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
          maxWidth: theme.breakpoints.values.xs - 1,
          mx: 'auto',
          mb: 2
        }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body1" fontWeight="bold">{active ? 'You are Clocked In' : 'Ready to Clock In?'}</Typography>
        </Toolbar>
        <Form method="post">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            {active
              ? (
                <>
                  <Timer timer={active} fabProps={{ color: 'success' }} />
                  <Button type="submit" variant="contained" color="info" sx={{ mt: 1 }}>Clock Out</Button>
                </>
              )
              : (
                <Fab type="submit" variant="extended" color="primary">
                  <PunchClockIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">Clock In</Typography>
                </Fab>
              )
            }
          </Box>
        </Form>
      </Paper>

      <Box component='section'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">History</Typography>
        </Toolbar>
        <Paper variant="outlined">
          <List dense disablePadding>
            {history.map((historyItem, index) => (
              <PunchHistoryListItem key={index}  punchHistory={historyItem} />
            ))}
          </List>
        </Paper>
      </Box>
    </Container >
  );
}

export default PunchPage;

const LIST_PUNCHES = gql(`
  query ListPunches($filter: ListPunchesFilter) {
    listPunches (filter: $filter) {
      active {
        ...Timer
      }
      history {
        ...PunchHistory
      }
    }
  }
`);

interface PunchPageLoader {
  readonly punches: Awaited<ApolloQueryResult<ListPunchesQuery>>;
}

export const punchPageLoader: LoaderFunction = async () => {
  return {
    punches: await apolloClient.query({
      query: LIST_PUNCHES
    }),
  };
}

export const REGISTER_PUNCH = gql(`
  mutation RegisterPunch {
    registerPunch {
      id
      startTime
      endTime
    }
  }
`);

export const punchPageAction: ActionFunction = async (args) => {
  const registerPunchMutation = await apolloClient.mutate({
    mutation: REGISTER_PUNCH
  });
  if (registerPunchMutation.errors) {
    throw new Response(JSON.stringify({ errors: registerPunchMutation.errors.map(error => error.message) }), { status: 400 });
  }
  return await punchPageLoader(args);
}
