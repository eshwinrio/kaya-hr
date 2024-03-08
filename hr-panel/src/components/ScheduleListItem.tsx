import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import { ListSchedulesQuery } from "../lib/gql-codegen/graphql";

interface ScheduleListItemProps extends ListItemProps {
  children?: never;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly schedule: ListSchedulesQuery['scheduledShifts'][number];
}

export default function ScheduleListItem({
  children,
  listItemButtonProps,
  listItemTextProps,
  schedule,
  ...props
}: ScheduleListItemProps) {
  return (
    <ListItem {...props}>
      {schedule && <ListItemButton>
        <ListItemText
          {...listItemTextProps}
          primary={schedule.user?.firstName}
          secondary={schedule.position?.title}
        />
      </ListItemButton>}
    </ListItem>
  );
}
