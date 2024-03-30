import { ApolloQueryResult } from '@apollo/client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import dayjs from 'dayjs';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import relaxingIllustration from '../assets/6524977_3322680.svg';
import PunchFab from '../components/PunchFab';
import ScheduleAssignmentListItem from '../components/ScheduleAssignmentListItem';
import { apolloClient } from '../lib/apollo';
import { gql } from '../lib/gql-codegen';
import { GrossEarningsQuery, ListMySchedulesQuery } from '../lib/gql-codegen/graphql';
import { useMaterialTheme } from '../lib/material-theme';


export default function HomePage() {
  const theme = useMaterialTheme();
  const navigate = useNavigate();
  const loaderData = useLoaderData() as HomePageLoader;
  const { schedulesToday, schedulesUpcoming, grossEarnings } = loaderData;

  const schedulesTodayView = schedulesToday && (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
      }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="bold">Today</Typography>
      </Toolbar>
      {schedulesToday.data.currentUser.schedules
        ? schedulesToday.data.currentUser.schedules.length > 0
          ? (
            <List>
              {schedulesToday.data.currentUser.schedules.map((schedule, index, schedules) => (
                <ScheduleAssignmentListItem
                  key={index}
                  scheduleAssignment={schedule}
                  divider={index < schedules.length - 1}
                  disableGutters disablePadding
                />
              ))}
            </List>
          )
          : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 3 }}>
              <Typography variant="body1">Nothing scheduled for today.</Typography>
              <img src={relaxingIllustration} alt="Relax" width={112} height={112} />
            </Box>
          )
        : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
            <Typography variant="body1">Could not load today's schedules.</Typography>
            <img src={relaxingIllustration} alt="Relax" width={112} height={112} />
          </Box>
        )
      }
    </Paper>
  );

  const schedulesUpcomingView = schedulesUpcoming && (
    <Paper component='section' variant='outlined' sx={{ mt: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="bold">Upcoming</Typography>
      </Toolbar>
      {schedulesUpcoming.data.currentUser.schedules
        ? schedulesUpcoming.data.currentUser.schedules.length > 0
          ? (
            <List disablePadding>
              {schedulesUpcoming.data.currentUser.schedules.map((schedule, index, schedules) => (
                <ScheduleAssignmentListItem
                  key={index}
                  scheduleAssignment={schedule}
                  divider={index < schedules.length - 1}
                  disableGutters disablePadding
                  scheduleTimingProps={{
                    sx: {
                      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
                    }
                  }}
                />
              ))}
            </List>
          )
          : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
              <Typography variant="body1">Nothing scheduled for the next 7 days.</Typography>
              <img src={relaxingIllustration} alt="Relax" width={112} height={112} />
            </Box>
          )
        : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
            <Typography variant="body1">Could not load upcoming schedules.</Typography>
            <img src={relaxingIllustration} alt="Relax" width={112} height={112} />
          </Box>
        )
      }
    </Paper>
  );

  const grossEarningsView = grossEarnings.data && (
    <Paper component='section' variant='outlined' sx={{ height: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="bold">Balance</Typography>
      </Toolbar>
      <Box sx={{ px: 3, py: 1 }}>
        <Typography variant="body1">Gross earnings</Typography>
        <Typography variant="h5" fontWeight="bold">
          ${grossEarnings.data.punches.reduce((acc, cur) => acc + cur.earning, 0)}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <Container>
      <Grid2 container alignItems='stretch' spacing={2}>
        <Grid2 xs={12} sm={6} md='auto'>
          {schedulesTodayView}
        </Grid2>
        <Grid2 xs={12} sm={6} md='auto'>
          {grossEarningsView}
        </Grid2>
      </Grid2>
      {schedulesUpcomingView}
      <PunchFab onClick={() => navigate('/punch')} />
    </Container>
  );
}

export const LIST_MY_SCHEDULES = gql(`
  query ListMySchedules ($options: ViewUserOptions) {
    currentUser(options: $options) {
      schedules {
        ...ScheduleAssignment
      }
    }
  }
`);

export const grossEarningsQuery = gql(`
  query GrossEarnings {
    punches(filter: { paymentStatus: [PENDING] }) {
      earning
    }
  }
`);

interface HomePageLoader {
  readonly schedulesToday: ApolloQueryResult<ListMySchedulesQuery>;
  readonly schedulesUpcoming: ApolloQueryResult<ListMySchedulesQuery>;
  readonly grossEarnings: ApolloQueryResult<GrossEarningsQuery>;
}

export const homePageLoader: LoaderFunction = async () => {
  return {
    schedulesToday: await apolloClient.query({
      query: LIST_MY_SCHEDULES,
      variables: {
        options: {
          scheduleFilters: {
            from: dayjs().startOf('day').toISOString(),
            to: dayjs().endOf('day').toISOString(),
          }
        }
      }
    }),
    schedulesUpcoming: await apolloClient.query({
      query: LIST_MY_SCHEDULES,
      variables: {
        options: {
          scheduleFilters: {
            from: dayjs().add(1, 'day').startOf('day').toISOString(),
            to: dayjs().add(7, 'day').endOf('day').toISOString(),
          }
        }
      }
    }),
    grossEarnings: await apolloClient.query({ query: grossEarningsQuery }),
  }
};
