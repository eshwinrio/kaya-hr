import { LoaderFunction, useLoaderData } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Box, Container, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apolloClient } from './lib/apollo';
import { LOAD_USERS } from './lib/gql-queries';
import { LoadAllUsersQuery } from './lib/gql-codegen/graphql';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import SearchWIdget from './components/SearchWidget';
import SearchIconWrapper from './components/SearchIconWrapper';
import SearchWidgetInputBase from './components/SearchWidgetInputBase';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number'
  },
  {
    field: 'fullName',
    headerName: 'First name',
    type: 'string',
    minWidth: 172,
    valueGetter(params: GridValueGetterParams) {
      return `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    minWidth: 196
  },
  {
    field: 'phone',
    headerName: 'Phone No',
    type: 'string',
    minWidth: 124
  },
  {
    field: 'dateJoined',
    headerName: 'Joined On',
    type: 'date',
    valueFormatter(params) {
      return new Date(params.value)
    },
  },
  {
    field: 'dateOfBirth',
    headerName: 'Date of Birth',
    type: 'date',
    valueFormatter(params) {
      return new Date(params.value)
    },
  },
  {
    field: 'streetName',
    headerName: 'Street Name',
    type: 'string'
  },
  {
    field: 'pincode',
    headerName: 'Pincode',
    type: 'string'
  }
];

export default function EmployeeList() {
  const data = useLoaderData() as LoadAllUsersQuery;

  return (
    <Container maxWidth='xl'>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>All members</Typography>
        <SearchWIdget>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchWidgetInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchWIdget>
      </Toolbar>
      <Box sx={{ overflowX: 'auto' }}>
        <DataGrid
          rows={data.users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}

export const employeeListLoader: LoaderFunction = async () => {
  return (await apolloClient.query({ query: LOAD_USERS })).data;
}
