import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC } from 'react';
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import ScheduleList from "../components/ScheduleList";
import { apolloClient } from "../lib/apollo";
import { ListAllSchedulesQuery } from "../lib/gql-codegen/graphql";
import { LIST_SCHEDULES } from "../lib/gql-queries";
import { useMaterialTheme } from "../lib/material-theme";

const ScheduleViewerPage: FC = () => {
  const schedules = useLoaderData() as ListAllSchedulesQuery;
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
      <Paper variant="outlined">
        <ScheduleList
          schedules={schedules.scheduledShifts.map((s) => s.schedule)}
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

export default ScheduleViewerPage;

export const scheduleViewerLoader: LoaderFunction = async () => {
  const listSchedulesQuery = await apolloClient.query({ query: LIST_SCHEDULES });
  return listSchedulesQuery.data;
};
