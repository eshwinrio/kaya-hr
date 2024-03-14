import { ApolloQueryResult } from '@apollo/client';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import ScheduleList from '../components/ScheduleAssignmentList';
import { apolloClient } from '../lib/apollo';
import { ListMySchedulesQuery } from '../lib/gql-codegen/graphql';
import { LIST_MY_SCHEDULES } from '../lib/gql-queries';
import { useMaterialTheme } from '../lib/material-theme';

export default function HomePage() {
  const theme = useMaterialTheme();
  const loaderData = useLoaderData() as HomePageLoader;

  const schedulesTodayView = loaderData.schedulesToday && (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.grey[200],
        maxWidth: theme.breakpoints.values.xs - 1,
      }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="bold">Today</Typography>
      </Toolbar>
      {loaderData.schedulesToday.data.currentUser.schedules
        && <ScheduleList
          schedules={loaderData.schedulesToday.data.currentUser.schedules}
          disablePadding
          itemProps={{
            disableGutters: true,
            disablePadding: true,
          }}
        />
      }
    </Paper>
  );

  const schedulesUpcomingView = loaderData.schedulesUpcoming && (
    <Paper component='section' variant='outlined' sx={{ mt: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="bold">Upcoming</Typography>
      </Toolbar>
      {loaderData.schedulesUpcoming.data.currentUser.schedules
        && <ScheduleList
          schedules={loaderData.schedulesUpcoming.data.currentUser.schedules}
          disablePadding
          itemProps={{
            disableGutters: true,
            disablePadding: true,
          }}
        />
      }
    </Paper>
  );

  return (
    <Container>
      {schedulesTodayView}
      {schedulesUpcomingView}
    </Container>
  );
}

interface HomePageLoader {
  readonly schedulesToday: ApolloQueryResult<ListMySchedulesQuery>;
  readonly schedulesUpcoming: ApolloQueryResult<ListMySchedulesQuery>;
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
    })
  }
};
