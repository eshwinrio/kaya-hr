import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LaunchIcon from '@mui/icons-material/Launch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import DashCard from '../components/DashCard';
import UserList from '../components/UserList';
import WeatherWidget from '../components/WeatherWidget';
import { apolloClient } from '../lib/apollo';
import { LoadAllUsersQuery } from '../lib/gql-codegen/graphql';
import { LOAD_USERS } from '../lib/gql-queries';
import { useWhoAmI } from '../lib/whoami-provider';
import { FC } from 'react';

const HomePage: FC = () => {
  const whoAmI = useWhoAmI();
  const data = useLoaderData() as LoadAllUsersQuery;

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
                value: data.users.length,
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
              <Button size='small' startIcon={<LaunchIcon fontSize='inherit' />} component={Link} to='/employees/list'>View all</Button>
            </Toolbar>
            <UserList
              disablePadding dense
              listItemProps={{ disableGutters: true, disablePadding: true, divider: true }}
              users={data.users}
              sx={{ height: 273, overflowY: 'auto' }}
            />
          </Paper>
        </Grid2>
      </Grid2 >
    </Container>
  );
}

export default HomePage;

export const homeLoader: LoaderFunction = async () => {
  return (await apolloClient.query({ query: LOAD_USERS })).data;
}
