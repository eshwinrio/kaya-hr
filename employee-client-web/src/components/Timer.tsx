import { Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import Fab, { FabProps } from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import dayjs from "../lib/dayjs";
import { useMaterialTheme } from "../lib/material-theme";

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

interface TimerProps extends BoxProps {
  startedAt: Dayjs;
  fabProps?: FabProps
}

export default function Timer({ startedAt, ...props }: TimerProps) {
  const theme = useMaterialTheme();
  const [elapsedTime, setElapsedTime] = useState(dayjs.duration(dayjs().diff(startedAt)));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(dayjs.duration(dayjs().diff(startedAt)));
    }, 60000);
    return () => clearInterval(interval);
  }, [startedAt]);


  return (
    <Box sx={{ m: 1, position: 'relative' }} {...props}>
      <StyledFab {...props.fabProps}>
        <Typography variant="h4" fontFamily="monospace">{elapsedTime.format('HH:mm')}</Typography>
      </StyledFab>
      <StyledCircularProgress
        variant="indeterminate"
        disableShrink
        thickness={2}
        size={theme.spacing(16)}
      />
    </Box>
  );
}
