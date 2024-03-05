import { LoaderFunction, useLoaderData } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {styled} from '@mui/material/styles';
import Banner from './components/Banner';
import { apolloClient } from './lib/apollo';
import { VIEW_USER } from './lib/gql-queries';
import { ViewUserQuery } from './lib/gql-codegen/graphql';
import { GraphQLError } from 'graphql';
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
      <Grid2 container gap={2} sx={{ marginTop: -8 }}>
        <Grid2 xs={12}>
          <UserAvatar
            src={whoAmI?.currentUser?.organization?.logoUrl ?? ''}
            alt={whoAmI?.currentUser?.firstName}
          />
        </Grid2>
        <Grid2 xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h5" fontWeight='bold'>{[data.user.firstName, data.user.lastName].join(' ')}</Typography>
          <Typography>{data.user.organization?.name}</Typography>
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
