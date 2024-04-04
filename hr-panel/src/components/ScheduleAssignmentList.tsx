import List, { ListProps } from '@mui/material/List';
import { ScheduleAssignment } from "../lib/gql-codegen/graphql";
import ScheduleAssignmentListItem from "./ScheduleAssignmentListItem";
import { ScheduleListItemProps } from './ScheduleListItem';

export interface ScheduleAssignmentListProps extends ListProps {
  children?: never;
  readonly scheduleAssignments: Array<ScheduleAssignment>;
  readonly itemProps?: Omit<ScheduleListItemProps, 'schedule'>;
}

export default function ScheduleAssignmentList({
  children,
  scheduleAssignments,
  itemProps,
  ...props
}: ScheduleAssignmentListProps) {
  return (
    <List {...props}>
      {scheduleAssignments.map(scheduleAssignment => (
        <ScheduleAssignmentListItem
          key={scheduleAssignment.id}
          scheduleAssignment={scheduleAssignment}
          {...itemProps}
        />
      ))}
    </List>
  );
}
