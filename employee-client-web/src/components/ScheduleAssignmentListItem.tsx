import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { FragmentType, gql, useFragment } from '../lib/gql-codegen';
import ScheduleTiming, { ScheduleTimingProps } from './ScheduleTiming';

const ScheduleAssignmentFragment = gql(`
  fragment ScheduleAssignment on ScheduleAssignment {
    id
    schedule {
      id
      title
      ...ScheduleTiming
    }
    position {
      id
      title
    }
    user {
      id
      firstName
      lastName
    }
  }
`);

export interface ScheduleAssignmentListItemProps extends ListItemProps {
  children?: never;
  readonly scheduleAssignment: FragmentType<typeof ScheduleAssignmentFragment>;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly scheduleTimingProps?: Omit<ScheduleTimingProps, 'schedule'>;
}

export default function ScheduleAssignmentListItem({
  children,
  scheduleAssignment,
  listItemButtonProps,
  listItemTextProps,
  scheduleTimingProps,
  ...props
}: ScheduleAssignmentListItemProps) {
  const scheduleAssignmentFragment = useFragment(ScheduleAssignmentFragment, scheduleAssignment);

  return (
    <ListItem {...props}>
      <ListItemButton>
        <Grid2 container direction="row" justifyContent="space-between" alignItems="baseline" rowSpacing={1} sx={{ width: '100%' }}>
          <Grid2 xs={12} sm='auto'>
            <ListItemText
              {...listItemTextProps}
              primary={scheduleAssignmentFragment.schedule.title}
              secondary={scheduleAssignmentFragment.position.title}
            />
          </Grid2>
          <ScheduleTiming
            elevation={0}
            {...scheduleTimingProps}
            schedule={scheduleAssignmentFragment.schedule}
          />
        </Grid2>
      </ListItemButton>
    </ListItem>
  );
}
