import AddIcon from '@mui/icons-material/Add';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GraphQLError } from 'graphql';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import Banner from './components/Banner';
import ScheduleAssignmentList from './components/ScheduleAssignmentList';
import { apolloClient } from './lib/apollo';
import { ListUserSchedulesQuery } from './lib/gql-codegen/graphql';
import { VIEW_USER_WITH_SCHEDULES } from './lib/gql-queries';
import { useMaterialTheme } from './lib/material-theme';

export default function ViewEmployee() {
  const userWithSchedules = useLoaderData() as ListUserSchedulesQuery;
  const theme = useMaterialTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth='lg'>
      <Banner sx={{
        backgroundImage: `url(${userWithSchedules.user.bannerUrl ?? ''})`,
        mb: 2
      }} />
      <Grid2 container sx={{ marginTop: -8 }}>
        <Grid2 xs={6}>
          <UserAvatar
            src={userWithSchedules.user.profileIconUrl ?? ''}
            alt={userWithSchedules.user.firstName}
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

      <Toolbar disableGutters sx={{ mt: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Schedules</Typography>
        <Box>
          {isMobileScreen
            ? <IconButton><AddIcon /></IconButton>
            : <Button>Assign</Button>
          }
        </Box>
      </Toolbar>
      <Paper variant="outlined">
        <ScheduleAssignmentList
          scheduleAssignments={userWithSchedules.user.schedules ?? []}
          disablePadding
          itemProps={{
            disableGutters: true,
            disablePadding: true,
          }}
        />
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
