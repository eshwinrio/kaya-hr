import { ApolloQueryResult } from '@apollo/client';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LaunchIcon from '@mui/icons-material/Launch';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { FC, useMemo } from 'react';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import DashCard from '../components/DashCard';
import UserListItem from '../components/UserListItem';
import WeatherWidget from '../components/WeatherWidget';
import { apolloClient } from '../lib/apollo';
import { gql } from '../lib/gql-codegen';
import { ActiveUsersQuery } from '../lib/gql-codegen/graphql';
import { useWhoAmI } from '../lib/whoami-provider';

const HomePage: FC = () => {
  const whoAmI = useWhoAmI();
  const loaderData = useLoaderData() as HomePageLoader;
  const activeUsers = useMemo(() => loaderData.activeUsers.data?.punches ?? [], [loaderData.activeUsers.data?.punches]);

  return (
    <Container>

      {/* Greeting text */}
      <Toolbar disableGutters>
        <Typography variant="body1">
          Hello {whoAmI?.currentUser?.firstName}!👋
        </Typography>
      </Toolbar>

      <Grid2 container spacing={3} alignItems="stretch">

        {/* Section 1 - Greeting 2 and overview */}
        <Grid2 container xs={12} sm={6} xl={4} spacing={1}>
          <Grid2 xs={12}>
            <WeatherWidget />
          </Grid2>
          <Grid2 container xs={12}>
            {[
              {
                title: 'Total employees',
                icon: <AssignmentIndIcon />,
                value: loaderData.activeUsers.data.punches.length,
                backgroundColor: "#CAB7EBD7",
                color: "#482880"
              },
              {
                title: 'On leave',
                icon: <AssignmentIndIcon />,
                value: 0,
                backgroundColor: "#E9DACFD7",
                color: "#482880"
              },
              {
                title: 'New recruits',
                icon: <AssignmentIndIcon />,
                value: 0,
                backgroundColor: "#D0E3CCD7",
                color: "#482880"
              },
              {
                title: 'On notice',
                icon: <AssignmentIndIcon />,
                value: 0,
                backgroundColor: "#E9DACF",
                color: "#482880"
              }
            ].map((data, index) => (
              <Grid2 xs={6} key={index}>
                <DashCard elevation={0} sx={{ backgroundColor: data.backgroundColor, color: data.color }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <IconButton size="small" edge="start" color='inherit'>
                      {data.icon}
                    </IconButton>
                    <Typography variant="caption">{data.title}</Typography>
                    <Typography variant="h5">{data.value}</Typography>
                  </Box>
                </DashCard>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        <Grid2 flex={1} xs={12} sm={6} xl={4}>
          <Paper variant='outlined' elevation={0} sx={{ height: '100%', overflowY: 'auto' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography>Active</Typography>
              <IconButton size='small' edge='end' component={Link} to='/employees'>
                <LaunchIcon fontSize='inherit' />
              </IconButton>
            </Toolbar>
            {activeUsers.length > 0
              ? (
                <List dense disablePadding>
                  {activeUsers.filter(user => user.user).map(user => (
                    <UserListItem
                      key={user.id}
                      user={user.user!}
                      disableGutters
                      disablePadding
                      divider
                    />
                  ))}
                </List>
              )
              : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>
                  <Typography variant='caption' color='text.secondary' sx={{ textAlign: 'center' }}>
                    No active employees
                  </Typography>
                </Box>
              )
            }
            {/* //   disablePadding dense
            //   listItemProps={{ disableGutters: true, disablePadding: true, divider: true }}
            //   users={data.users}
            //   sx={{ height: 273, overflowY: 'auto' }}
            // /> */}
          </Paper>
        </Grid2>
      </Grid2 >
    </Container>
  );
}

export default HomePage;

const activeEmployeesQuery = gql(`
  query ActiveUsers {
    punches(filter: { activeOnly: true }) {
      id
      user { ...UserListItem }
    }
  }
`);

interface HomePageLoader {
  readonly activeUsers: Awaited<ApolloQueryResult<ActiveUsersQuery>>;
}

export const homeLoader: LoaderFunction = async () => {
  return {
    activeUsers: await apolloClient.query({ query: activeEmployeesQuery })
  };
}
