import { ApolloQueryResult } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from '@mui/material/List';
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC, useMemo } from 'react';
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import ScheduleListItem from '../components/ScheduleListItem';
import { apolloClient } from "../lib/apollo";
import { gql } from '../lib/gql-codegen';
import { SchedulesViewerQuery } from "../lib/gql-codegen/graphql";
import { useMaterialTheme } from "../lib/material-theme";


const ScheduleViewerPage: FC = () => {
  const loaderData = useLoaderData() as ScheduleViewerLoader;
  const schedules = useMemo(() => loaderData.schedules, [loaderData]);
  const theme = useMaterialTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Schedules</Typography>
        <Box>
          <Button startIcon={<AddIcon />} component={Link} to="editor" size={isMobileScreen ? 'small' : 'medium'}>Create</Button>
        </Box>
      </Toolbar>
      {schedules.data && (
        <Paper variant="outlined">
          <List disablePadding>
            {schedules.data.schedules.map(schedule => (
              <ScheduleListItem
                key={schedule.id}
                schedule={schedule}
                disableGutters
                disablePadding
              />
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}

export default ScheduleViewerPage;

const query = gql(`
  query SchedulesViewer($filters: ListScheduleFilter) {
    schedules(filters: $filters) {
      id
      ...ScheduleListItem
    }
  }
`);

interface ScheduleViewerLoader {
  schedules: Awaited<ApolloQueryResult<SchedulesViewerQuery>>;
}

export const scheduleViewerLoader: LoaderFunction = async () => {
  return {
    schedules: await apolloClient.query({ query })
  };
};
