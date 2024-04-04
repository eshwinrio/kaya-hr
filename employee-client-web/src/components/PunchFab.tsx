import PunchClockIcon from '@mui/icons-material/PunchClock';
import Fab, { FabProps } from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

interface PunchFabProps extends FabProps {}

export default function PunchFab(props: PunchFabProps) {
  return (
    <StyledFab color="primary" aria-label="Punch Clock" {...props}>
      <PunchClockIcon />
    </StyledFab>
  );
}
