import { useMutation } from '@apollo/client';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link, LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import ListEmployee from './components/ListEmployee';
import SearchIconWrapper from './components/SearchIconWrapper';
import SearchWIdget from './components/SearchWidget';
import SearchWidgetInputBase from './components/SearchWidgetInputBase';
import SyncInProgressIcon from './components/SyncInProgressIcon';
import { apolloClient } from './lib/apollo';
import { LoadAllUsersQuery } from './lib/gql-codegen/graphql';
import { LOAD_USERS, SYNC_USERS } from './lib/gql-queries';
import { useMaterialTheme } from './lib/material-theme';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
    maxWidth: 64,
  },
  {
    field: 'fullName',
    headerName: 'Name',
    type: 'string',
    minWidth: 148,
    valueGetter(params: GridValueGetterParams) {
      return `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    minWidth: 164,
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
    type: 'string',
  },
  {
    field: 'pincode',
    headerName: 'Pincode',
    type: 'string'
  }
];

export default function EmployeeList() {
  const data = useLoaderData() as LoadAllUsersQuery;
  const navigate = useNavigate();
  const [ syncMutate, { loading } ] = useMutation(SYNC_USERS);
  const materialTheme = useMaterialTheme();
  const isXsScreen = useMediaQuery(materialTheme.breakpoints.up('xs'));
  const isLgScreen = useMediaQuery(materialTheme.breakpoints.up('lg'));

  return (
    <Container maxWidth='xl'>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }} noWrap>All members</Typography>
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
      <Toolbar disableGutters sx={{ justifyContent: 'flex-end', gap: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
         {/* Redirect to reload current page */}
         <Button
          component={Link}
          to="."
          startIcon={<RefreshIcon />}>
          Reload
        </Button>
        {/* Add employee redirect */}
        <Button
          component={Link}
          to="../add"
          startIcon={<PersonAddAltIcon />}>
          Add
        </Button>
        {/* Sync to auth button */}
        <Button
          onClick={() => syncMutate()}
          startIcon={loading ? <SyncInProgressIcon /> : <CloudSyncIcon />}>
          Sync
        </Button>
      </Toolbar>
      {isXsScreen ? (
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
          onRowClick={params => navigate(`/employees/view/${params.id}`)}
          columnVisibilityModel={{
            streetName: isLgScreen,
            pincode: isLgScreen
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <ListEmployee
          listItemProps={{ disablePadding: true }}
          listItemButtonProps={{ disableGutters: true }}
          data={data}
        />
      )}
    </Container>
  );
}

export const employeeListLoader: LoaderFunction = async () => {
  return (await apolloClient.query({ query: LOAD_USERS })).data;
}
