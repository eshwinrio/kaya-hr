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
import DashCard from './components/DashCard';
import ListEmployee from './components/ListEmployee';
import { apolloClient } from './lib/apollo';
import { LoadAllUsersQuery } from './lib/gql-codegen/graphql';
import { LOAD_USERS } from './lib/gql-queries';
import { useWhoAmI } from './lib/whoami-provider';

export default function Home() {
  const whoAmI = useWhoAmI();
  const data = useLoaderData() as LoadAllUsersQuery;

  return (
    <Container>

      {/* Greeting text */}
      <Typography variant="body1">
        Hello {whoAmI?.currentUser?.firstName}!👋
      </Typography>

      <Grid2 container spacing={2} alignItems="stretch">

        {/* Section 1 - Greeting 2 and overview */}
        <Grid2 xs={12} sm={6} xl={4}>

          {/* Days greeting */}
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5" fontWeight={600}>
              Good morning!
            </Typography>
          </Toolbar>

          <div>
            <Grid2 container spacing={1}>

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
          </div>
        </Grid2>

        <Grid2 container direction='column' alignItems='stretch' spacing={0} xs={12} sm={6} xl={4}>
          <Grid2>
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight={600}>Active employees</Typography>
              <Button size='small' startIcon={<LaunchIcon fontSize='inherit' />} component={Link} to='/employees/list'>View all</Button>
            </Toolbar>
          </Grid2>

          <Grid2 flex={1}>
            <Paper variant='outlined' elevation={0} sx={{ height: '100%', overflowY: 'auto' }}>
              <ListEmployee
                disablePadding dense
                listItemProps={{ disableGutters: true, disablePadding: true, divider: true }}
                data={data}
                sx={{ height: 212, overflowY: 'auto' }}
              />
            </Paper>
          </Grid2>
        </Grid2>
      </Grid2 >
    </Container>
  );
}

export const homeLoader: LoaderFunction = async () => {
  return (await apolloClient.query({ query: LOAD_USERS })).data;
}
