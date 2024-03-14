import List, { ListProps } from '@mui/material/List';
import { ScheduleAssignment } from "../lib/gql-codegen/graphql";
import ScheduleAssignmentListItem, { ScheduleAssignmentListItemProps } from './ScheduleAssignmentListItem';

export interface ScheduleAssignmentListProps extends ListProps {
  children?: never;
  readonly schedules: Array<Omit<ScheduleAssignment, 'user'>>;
  readonly itemProps?: Omit<ScheduleAssignmentListItemProps, 'schedule'>;
}

export default function ScheduleList({
  children,
  schedules,
  itemProps,
  ...props
}: ScheduleAssignmentListProps) {
  return (
    <List {...props}>
      {schedules.map((schedule, index) => (
        <ScheduleAssignmentListItem
          key={schedule.id}
          schedule={schedule}
          divider={index < schedules.length - 1}
          {...itemProps}
        />
      ))}
    </List>
  );
}
