import { Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import Fab, { FabProps } from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import dayjs from "../lib/dayjs";
import { useMaterialTheme } from "../lib/material-theme";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  animationDuration: '4s',
  position: 'absolute',
  top: -2,
  left: -2,
  zIndex: 1,
  color: theme.palette.primary.main,
  [`& .${circularProgressClasses.circle}`]: {
    strokeLinecap: 'round',
  },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  width: theme.spacing(15.5),
  height: theme.spacing(15.5),
}));

const TimerFragment = gql(`
  fragment Timer on ClockTime {
    startTime
  }
`);

interface TimerProps extends BoxProps {
  readonly timer: FragmentType<typeof TimerFragment>;
  fabProps?: FabProps
}

export default function Timer({ timer, fabProps, ...props }: TimerProps) {
  const theme = useMaterialTheme();
  const timerFragment = useFragment(TimerFragment, timer);
  const startedAt = dayjs(timerFragment.startTime);
  const [elapsedTime, setElapsedTime] = useState(dayjs.duration(dayjs().diff(startedAt)));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(dayjs.duration(dayjs().diff(startedAt)));
    }, 60000);
    return () => clearInterval(interval);
  }, [startedAt]);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }} {...props}>
        <StyledFab {...fabProps}>
          <Typography variant="h4" fontFamily="monospace">{elapsedTime.format('HH:mm')}</Typography>
        </StyledFab>
        <StyledCircularProgress
          variant="indeterminate"
          disableShrink
          thickness={2}
          size={theme.spacing(16)}
        />
      </Box>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Punched-in at {startedAt.format('h:mm A')}
      </Typography>
    </Box>
  );
}
