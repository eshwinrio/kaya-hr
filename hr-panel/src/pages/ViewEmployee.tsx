import AddIcon from '@mui/icons-material/Add';
import CallIcon from '@mui/icons-material/Call';
import EditIcon from '@mui/icons-material/Edit';
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
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import Banner from '../components/Banner';
import ScheduleAssignmentList from '../components/ScheduleAssignmentList';
import UserAvatar from '../components/UserAvatar';
import { apolloClient } from '../lib/apollo';
import { gql } from '../lib/gql-codegen';
import { ViewEmployeeQuery } from '../lib/gql-codegen/graphql';
import { useMaterialTheme } from '../lib/material-theme';

export default function ViewEmployee() {
  const userWithSchedules = useLoaderData() as ViewEmployeeQuery;
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
          <StyledUserAvatar user={userWithSchedules.user} />
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
        <Grid2 xs={12} sm sx={{ pl: 1, pt: 2 }}>
          <Typography variant="h5" fontWeight='bold'>
            {[userWithSchedules.user.firstName, userWithSchedules.user.middleName, userWithSchedules.user.lastName].filter(Boolean).join(' ')}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>{userWithSchedules.user.email}</Typography>
          <Typography variant='subtitle2'>
            {userWithSchedules.user.city},&nbsp;{userWithSchedules.user.country},&nbsp;{userWithSchedules.user.province}
          </Typography>
        </Grid2>
        <Grid2 xs={12} sm='auto'>
          <Button
            component={Link}
            to={`../editor/${userWithSchedules.user.id}`}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Grid2>
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

const query = gql(`
  query ViewEmployee ($userId: Int!) {
    user(id: $userId) {
      id
      firstName
      middleName
      lastName
      email
      phone
      city
      country
      province
      roles
      ...Avatar
      bannerUrl
      schedules {
        id
        position {
          id
          title
          description
          hourlyWage
        }
        schedule {
          id
          title
          dateTimeStart
          dateTimeEnd
          createdBy {
            id
            email
            firstName
            lastName
            streetName
            city
            country
            province
            pincode
            dateOfBirth
            dateJoined
            phone
          }
          createdAt
        }
        user {
          id
          email
          firstName
          lastName
          streetName
          city
          country
          province
          pincode
          dateOfBirth
          dateJoined
          phone
        }
      }
    }
  }
`);

export const viewEmployeeLoader: LoaderFunction = async ({ params }) => {
  const userId = parseInt(params.id!);
  if (!userId) {
    throw new GraphQLError('Invalid ID')
  }
  const user = await apolloClient.query({ query, variables: { userId } });
  return user.data;
}

const StyledUserAvatar = styled(UserAvatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  marginLeft: 16,
  boxShadow: theme.shadows[2]
}));
