import { Link, LoaderFunction, useLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Card, Container, IconButton, Toolbar } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LaunchIcon from '@mui/icons-material/Launch';
import DashCard from './components/DashCard';
import { useWhoAmI } from './lib/whoami-provider';
import { apolloClient } from './lib/apollo';
import { LOAD_USERS } from './lib/gql-queries';
import { LoadAllUsersQuery } from './lib/gql-codegen/graphql';
import ListEmployee from './components/ListEmployee';

export default function Home() {
  const whoAmI = useWhoAmI();
  const data = useLoaderData() as LoadAllUsersQuery;

  return (
    <Container>

      {/* Greeting text */}
      <Typography variant="body1" gutterBottom>
        Hello {whoAmI?.currentUser?.firstName}!👋
      </Typography>

      <Grid2 container spacing={2} alignItems="flex-start">

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

        <Grid2 xs={12} sm={6} xl={4}>

          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={600}>Active employees</Typography>
            <Button size='small' startIcon={<LaunchIcon fontSize='inherit' />} component={Link} to='/employees/list'>View all</Button>
          </Toolbar>

          <Card variant='outlined' elevation={0} sx={{ maxHeight: 218, height: '100%', overflowY: 'auto' }}>
            <ListEmployee disablePadding dense />
          </Card>
        </Grid2>
      </Grid2 >
    </Container>
  );
}

export const homeLoader: LoaderFunction = async () => {
  return (await apolloClient.query({ query: LOAD_USERS })).data;
}
