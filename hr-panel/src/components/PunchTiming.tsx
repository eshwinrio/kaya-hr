import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import dayjs from "../lib/dayjs";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";

export const PunchTimingFragment = gql(`
  fragment PunchTiming on ClockTime {
    startTime
    endTime
    netHours
  }
`);

export interface PunchTimingProps extends PaperProps {
  readonly punchTiming: FragmentType<typeof PunchTimingFragment>;
  readonly dateTypographyProps?: TypographyProps;
  readonly timeTypographyProps?: TypographyProps;
}

const PunchTiming: FC<PunchTimingProps> = ({ punchTiming, dateTypographyProps, timeTypographyProps, ...props }) => {
  const punchTimingFragment = useFragment(PunchTimingFragment, punchTiming);
  const startDayjs = dayjs(punchTimingFragment.startTime);
  const endDayjs = dayjs(punchTimingFragment.endTime);

  return (
    <Paper {...props} sx={{ p: 1, ...props.sx }}>
      <Grid2 container direction='row' alignItems='center' xs={12} sm='auto'>
        <Grid2 container direction='column' alignItems='flex-start'>
          <Typography variant='subtitle2' {...dateTypographyProps}>{startDayjs.format("ddd, MMM D")}</Typography>
          <Typography variant='h6' {...dateTypographyProps}>{startDayjs.format("HH:mm")}</Typography>
          <Typography variant='caption' {...timeTypographyProps}>{startDayjs.format("A")}</Typography>
        </Grid2>
        <Grid2>
          <ArrowRightIcon />
        </Grid2>
        <Grid2 container direction='column' alignItems='flex-start'>
          <Typography variant='subtitle2' {...dateTypographyProps}>{endDayjs.format("ddd, MMM D")}</Typography>
          <Typography variant='h6' {...dateTypographyProps}>{endDayjs.format("HH:mm")}</Typography>
          <Typography variant='caption' {...timeTypographyProps}>{endDayjs.format("A")}</Typography>
        </Grid2>
      </Grid2>
      <Typography variant='caption' {...timeTypographyProps}>{punchTimingFragment.netHours} hours</Typography>
    </Paper>
  )
}

export default PunchTiming;