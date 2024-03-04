import { Link, LoaderFunction, useLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, Container, IconButton, Input, Toolbar, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LaunchIcon from '@mui/icons-material/Launch';
import DashCard from './components/DashCard';
import { useWhoAmI } from './lib/whoami-provider';
import { apolloClient } from './lib/apollo';
import { LOAD_USERS, VIEW_USER } from './lib/gql-queries';
import { LoadAllUsersQuery, ViewUserQuery } from './lib/gql-codegen/graphql';
import ListEmployee from './components/ListEmployee';
import { GraphQLError } from 'graphql';

const EditableTypography = styled(Input)(({ theme }) => ({
  ...theme.typography.h6,
}));

export default function ViewEmployee() {
  // const whoAmI = useWhoAmI();
  const data = useLoaderData() as ViewUserQuery;
  console.log(data);

  return (
    <Container maxWidth='lg'>
      <Grid2 container>
        <Grid2 container direction='column' alignItems='center' xs={12} sm={6} md={4} lg={3}>
          <Avatar sx={{ width: 146, height: 146 }}>{data.user.firstName.charAt(0)}</Avatar>
          <Typography>{data.user.firstName}</Typography>
          <Typography>{data.user.lastName}</Typography>
          <Typography>{data.user.dateOfBirth}</Typography>
          <Typography>{data.user.country}</Typography>
          
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
    variables: { id, options: { roles: true } }
  })
  return user.data;
}
