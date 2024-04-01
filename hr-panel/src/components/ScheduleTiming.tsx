import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useState } from "react";
import dayjs from "../lib/dayjs";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";
import BorderLinearProgress from "./BorderLinearProgress";

export const ScheduleTimingFragment = gql(`
  fragment ScheduleTiming on Schedule {
    dateTimeStart
    dateTimeEnd
  }
`);

export interface ScheduleTimingProps extends PaperProps {
  readonly schedule: FragmentType<typeof ScheduleTimingFragment>;
  readonly dateTypographyProps?: TypographyProps;
  readonly timeTypographyProps?: TypographyProps;
}

const ScheduleTiming: FC<ScheduleTimingProps> = ({ schedule, dateTypographyProps, timeTypographyProps, ...props }) => {
  const scheduleTimingFragment = useFragment(ScheduleTimingFragment, schedule);
  const dayjsStart = dayjs(scheduleTimingFragment.dateTimeStart);
  const dayjsEnd = dayjs(scheduleTimingFragment.dateTimeEnd);
  const [dayjsNow, setDayjsNow] = useState(dayjs());
  const isShiftInProgress = dayjsStart.isBefore(dayjsNow) && dayjsEnd.isAfter(dayjsNow);
  const shiftProgress = Math.round((dayjsNow.diff(dayjsStart, 'milliseconds') / dayjsEnd.diff(dayjsStart, 'milliseconds')) * 100);

  useEffect(() => {
    const interval = setInterval(() => setDayjsNow(dayjs()), 1000);
    return () => clearInterval(interval);
  });

  return (
    <Paper {...props} sx={{ p: 1, ...props.sx }}>
      <Grid2 container direction='row' alignItems='center' xs={12} sm='auto'>
        <Grid2>
          <Typography variant='subtitle2' {...dateTypographyProps}>{dayjsStart.format("ddd, MMM DD")}</Typography>
          <Typography align="right" variant='h6' {...timeTypographyProps}>{dayjsStart.format("HH:mm A")}</Typography>
        </Grid2>
        <Grid2>
          <ArrowRightIcon />
        </Grid2>
        <Grid2>
          <Typography variant='subtitle2' {...dateTypographyProps}>{dayjsEnd.format("ddd, MMM DD")}</Typography>
          <Typography align="left" variant='h6' {...timeTypographyProps}>{dayjsEnd.format("HH:mm A")}</Typography>
        </Grid2>
      </Grid2>
      {isShiftInProgress && <BorderLinearProgress variant="determinate" value={shiftProgress} />}
    </Paper>
  )
}

export default ScheduleTiming;
