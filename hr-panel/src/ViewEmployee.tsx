import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';
import { GraphQLError } from 'graphql';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import Banner from './components/Banner';
import ScheduleListItem from './components/ScheduleListItem';
import { apolloClient } from './lib/apollo';
import { ViewUserWithSchedulesQuery } from './lib/gql-codegen/graphql';
import { VIEW_USER_WITH_SCHEDULES } from './lib/gql-queries';
import { useWhoAmI } from './lib/whoami-provider';


export default function ViewEmployee() {
  const whoAmI = useWhoAmI();
  const userWithSchedules = useLoaderData() as ViewUserWithSchedulesQuery;

  return (
    <Container maxWidth='lg'>
      <Banner sx={{
        backgroundImage: `url(${whoAmI?.currentUser?.organization?.bannerUrl})`,
        mb: 2
      }} />
      <Grid2 container sx={{ marginTop: -8 }}>
        <Grid2 xs={6}>
          <UserAvatar
            src={whoAmI?.currentUser?.organization?.logoUrl ?? ''}
            alt={whoAmI?.currentUser?.firstName}
          />
        </Grid2>
        <Grid2 container alignItems='flex-start' justifyContent='flex-end' xs={6} sx={{ pt: 8 }}>
          <ButtonGroup variant="outlined">
            <Button href={`tel:${userWithSchedules.user.phone}`}>
              <CallIcon />
            </Button>
            <Button href={`mailto:${userWithSchedules.user.email}`}>
              <MailIcon />
            </Button>
          </ButtonGroup>
        </Grid2>
        <Grid2 xs={12} sm={6} md={4} lg={3} sx={{ pl: 1, pt: 2 }}>
          <Typography variant="h5" fontWeight='bold'>
            {[userWithSchedules.user.firstName, userWithSchedules.user.middleName, userWithSchedules.user.lastName].filter(Boolean).join(' ')}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>{userWithSchedules.user.email}</Typography>
          <Typography variant='subtitle2'>
            {userWithSchedules.user.city},&nbsp;{userWithSchedules.user.country},&nbsp;{userWithSchedules.user.province}
          </Typography>
        </Grid2>
        <Grid2 xs={12} sm='auto'></Grid2>
      </Grid2>
      
      <Toolbar disableGutters sx={{ mt: 2 }}>
        <Typography variant="h6">Schedules</Typography>
      </Toolbar>
      <Paper variant="outlined">
        <List disablePadding>
          {userWithSchedules.user.schedules?.map((shift, index, schedules) => (
            <ScheduleListItem
              key={index}
              schedule={shift}
              disableGutters
              disablePadding
              divider={index < schedules.length - 1}
            />
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export const viewEmployeeLoader: LoaderFunction = async ({ params }) => {
  const userId = parseInt(params.id!);
  if (!userId) {
    throw new GraphQLError('Invalid ID')
  }
  const user = await apolloClient.query({
    query: VIEW_USER_WITH_SCHEDULES,
    variables: { userId }
  });
  return user.data;
}

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  marginLeft: 16,
  boxShadow: theme.shadows[2]
}));
