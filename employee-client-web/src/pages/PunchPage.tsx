import { ApolloQueryResult } from "@apollo/client";
import PunchClockIcon from '@mui/icons-material/PunchClock';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC, Fragment, useMemo } from "react";
import { ActionFunction, Form, LoaderFunction, useLoaderData } from "react-router-dom";
import Timer from "../components/Timer";
import { REGISTER_PUNCH } from "../graphql/gql-queries";
import { apolloClient } from "../lib/apollo";
import dayjs from "../lib/dayjs";
import { ListPunchesQuery } from "../lib/gql-codegen/graphql";
import { useMaterialTheme } from "../lib/material-theme";
import { gql } from "../lib/gql-codegen";


const PunchPage: FC = () => {
  const theme = useMaterialTheme();
  const loaderData = useLoaderData() as Awaited<PunchPageLoader>;
  const punches = useMemo(() => loaderData?.punches, [loaderData?.punches]);
  const activePunch = useMemo(() => punches?.data.listPunches.activePunch, [punches?.data.listPunches.activePunch]);
  const seggregatedHistory = useMemo<Record<string, ListPunchesQuery['listPunches']['history']>>(() => {
    const dict: Record<string, ListPunchesQuery['listPunches']['history']> = {};
    punches?.data.listPunches.history?.forEach((punch) => {
      const date = dayjs(punch.startTime).format('YYYY-MM-DD');
      if (!dict[date]) {
        dict[date] = [];
      }
      dict[date]?.push(punch);
    })
    return dict;
  }, [punches?.data.listPunches.history]);

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
          <Typography variant="body1" fontWeight="bold">{activePunch ? 'You are Clocked In' : 'Ready to Clock In?'}</Typography>
        </Toolbar>
        <Form method="post">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            {activePunch
              ? (
                <>
                  <Timer timer={activePunch} fabProps={{ color: 'success' }} />
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
          <List dense>
            {seggregatedHistory && Object.keys(seggregatedHistory).map((date, index) => (
              <Fragment key={index}>
                <ListSubheader>{date}</ListSubheader>
                {seggregatedHistory[date]?.map((punch) => (
                  <ListItem key={punch.id}>
                    <ListItemText
                      primary={`${dayjs(punch.startTime).format('h:mm A')} - ${dayjs(punch.endTime).format('h:mm A')}`}
                      secondary={`Lasted ${dayjs.duration(dayjs(punch.endTime).diff(dayjs(punch.startTime))).humanize()}`}
                    />
                  </ListItem>
                ))}
              </Fragment>
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
      activePunch {
        ...Timer
      }
      history {
        id
        startTime
        endTime
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

export const punchPageAction: ActionFunction = async (args) => {
  const registerPunchMutation = await apolloClient.mutate({
    mutation: REGISTER_PUNCH
  });
  if (registerPunchMutation.errors) {
    throw new Response(JSON.stringify({ errors: registerPunchMutation.errors.map(error => error.message) }), { status: 400 });
  }
  return await punchPageLoader(args);
}
