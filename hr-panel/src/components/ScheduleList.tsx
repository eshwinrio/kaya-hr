import { Schedule } from "../lib/gql-codegen/graphql";
import List, { ListProps } from '@mui/material/List';
import ScheduleListItem, { ScheduleListItemProps } from './ScheduleListItem';

export interface ScheduleListProps extends ListProps {
  children?: never;
  readonly schedules: Array<Schedule>;
  readonly itemProps?: Omit<ScheduleListItemProps, 'schedule'>;
}

export default function ScheduleList({
  children,
  schedules,
  itemProps,
  ...props
}: ScheduleListProps) {
  return (
    <List {...props}>
      {schedules.map((schedule) => (
        <ScheduleListItem
          key={schedule.id}
          schedule={schedule}
          {...itemProps}
        />
      ))}
    </List>
  );
}
