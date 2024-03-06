import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';
import { GraphQLError } from 'graphql';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import Banner from './components/Banner';
import { apolloClient } from './lib/apollo';
import { ViewUserQuery } from './lib/gql-codegen/graphql';
import { VIEW_USER } from './lib/gql-queries';
import { useWhoAmI } from './lib/whoami-provider';

const EditableTypography = styled(Input)(({ theme }) => ({
  ...theme.typography.h6,
}));

export default function ViewEmployee() {
  const whoAmI = useWhoAmI();
  const data = useLoaderData() as ViewUserQuery;

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
            <Button href={`tel:${data.user.phone}`}>
              <CallIcon />
            </Button>
            <Button href={`mailto:${data.user.email}`}>
              <MailIcon />
            </Button>
          </ButtonGroup>
        </Grid2>
        <Grid2 xs={12} sm={6} md={4} lg={3} sx={{ pl: 1, pt: 2 }}>
          <Typography variant="h5" fontWeight='bold'>{[data.user.firstName, data.user.lastName].join(' ')}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>{data.user.organization?.name}</Typography>
          <Typography variant='subtitle2'>{data.user.city}, {data.user.country}, {data.user.province}</Typography>
        </Grid2>
        <Grid2 xs={12} sm='auto'></Grid2>
      </Grid2>
      <EditableTypography disableUnderline />
    </Container>
  );
}

export const viewEmployeeLoader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.id!);
  if (!id) {
    throw new GraphQLError('Invalid ID')
  }
  const user = await apolloClient.query({
    query: VIEW_USER,
    variables: { id }
  })
  return user.data;
}

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  marginLeft: 16,
  boxShadow: theme.shadows[2]
}));
