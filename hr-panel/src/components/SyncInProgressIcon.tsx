import { keyframes, styled } from "@mui/material/styles";
import SyncIcon from '@mui/icons-material/Sync';

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

export default styled(SyncIcon)(() => ({
  animation: `${spin} 2s linear infinite`,
}));
