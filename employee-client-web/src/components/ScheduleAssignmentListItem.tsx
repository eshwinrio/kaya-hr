import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import dayjs from "dayjs";
import { useEffect, useState } from 'react';
import { ScheduleAssignment } from "../lib/gql-codegen/graphql";
import BorderLinearProgress from './BorderLinearProgress';

export interface ScheduleAssignmentListItemProps extends ListItemProps {
  children?: never;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly schedule: Omit<ScheduleAssignment, 'user'>;
}

export default function ScheduleAssignmentListItem({
  children,
  listItemButtonProps,
  listItemTextProps,
  schedule,
  ...props
}: ScheduleAssignmentListItemProps) {
  const dayjsStart = dayjs(schedule.schedule.dateTimeStart);
  const dayjsEnd = dayjs(schedule.schedule.dateTimeEnd);
  const [dayjsNow, setDayjsNow] = useState(dayjs());
  const isShiftInProgress = dayjsStart.isBefore(dayjsNow) && dayjsEnd.isAfter(dayjsNow);
  const shiftProgress = Math.round((dayjsNow.diff(dayjsStart, 'milliseconds') / dayjsEnd.diff(dayjsStart, 'milliseconds')) * 100);

  useEffect(() => {
    const interval = setInterval(() => setDayjsNow(dayjs()), 1000);
    return () => clearInterval(interval);
  });

  return (
    <ListItem {...props}>
      <ListItemButton>
        <Grid2 container direction="row" justifyContent="space-between" alignItems="baseline" rowSpacing={1} sx={{ width: '100%' }}>
          <Grid2 xs={12} sm='auto'>
            <ListItemText
              {...listItemTextProps}
              primary={schedule.schedule.title}
              secondary={schedule.position?.title}
            />
          </Grid2>
          <Grid2 container direction='row' alignItems='center' xs={12} sm='auto'>
            <Grid2>
              <Typography variant='subtitle2'>{dayjsStart.format("ddd, MMM DD")}</Typography>
              <Typography align="right" variant='h6'>{dayjsStart.format("HH:mm A")}</Typography>
            </Grid2>
            <Grid2>
              <ArrowRightIcon />
            </Grid2>
            <Grid2>
              <Typography variant='subtitle2'>{dayjsEnd.format("ddd, MMM DD")}</Typography>
              <Typography align="left" variant='h6'>{dayjsEnd.format("HH:mm A")}</Typography>
            </Grid2>
          </Grid2>
          {isShiftInProgress && <Grid2 xs={12}>
            <BorderLinearProgress variant="determinate" value={shiftProgress} />
          </Grid2>}
        </Grid2>
      </ListItemButton>
    </ListItem>
  );
}
