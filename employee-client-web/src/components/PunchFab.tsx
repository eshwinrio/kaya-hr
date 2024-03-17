import PunchClockIcon from '@mui/icons-material/PunchClock';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

export default function PunchFab() {
  return (
    <StyledFab
      color="primary"
      aria-label="Punch Clock"
      href="/punch"
    >
      <PunchClockIcon />
    </StyledFab>
  );
}
