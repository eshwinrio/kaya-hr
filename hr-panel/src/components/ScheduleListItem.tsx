import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';
import dayjs from "dayjs";
import { useEffect, useState } from 'react';
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
  const dayjsStart = dayjs(schedule?.dateTimeStart);
  const dayjsEnd = dayjs(schedule?.dateTimeEnd);
  const [dayjsNow, setDayjsNow] = useState(dayjs());
  const isShiftInProgress = dayjsStart.isBefore(dayjsNow) && dayjsEnd.isAfter(dayjsNow);
  const shiftProgress = Math.round((dayjsNow.diff(dayjsStart, 'milliseconds') / dayjsEnd.diff(dayjsStart, 'milliseconds')) * 100);

  useEffect(() => {
    const interval = setInterval(() => setDayjsNow(dayjs()), 1000);
    return () => clearInterval(interval);
  });

  return (
    <ListItem {...props}>
      {schedule && <ListItemButton>
        <Grid2 container direction="row" justifyContent="space-between" alignItems="center" rowSpacing={1} sx={{ width: '100%' }}>
          <Grid2 xs={12} sm='auto' flex={1}>
            <ListItemText
              {...listItemTextProps}
              primary={schedule.user?.firstName}
              secondary={schedule.position?.title}
            />
          </Grid2>
          <Grid2 container>
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
      </ListItemButton>}
    </ListItem>
  );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: theme.shape.borderRadius,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    backgroundImage: theme.palette.mode === 'light' ? 'linear-gradient(to right, #b86987, #308fe8)' : 'linear-gradient(to right, #308fe8, #b86987)',
  },
}));
