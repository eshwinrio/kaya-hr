import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import ScheduleListItem from "./components/ScheduleListItem";
import { apolloClient } from "./lib/apollo";
import { ListSchedulesQuery } from "./lib/gql-codegen/graphql";
import { LIST_SCHEDULES } from "./lib/gql-queries";

export default function ScheduleViewer() {
  const schedules = useLoaderData() as ListSchedulesQuery;

  return (
    <Container>
      <Toolbar disableGutters>
        <Typography variant="h6">Schedules</Typography>
      </Toolbar>
      <Paper variant="outlined">
        <List disablePadding>
          {schedules.scheduledShifts.map((shift, index) => (
            <ScheduleListItem
              key={index}
              schedule={shift}
              disableGutters
              disablePadding
              divider={index < schedules.scheduledShifts.length - 1}
            />
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export const scheduleViewerLoader: LoaderFunction = async () => {
    const listSchedulesQuery = await apolloClient.query({ query: LIST_SCHEDULES });
    return listSchedulesQuery.data;
};
