import SyncIcon from '@mui/icons-material/Sync';
import { keyframes, styled } from "@mui/material/styles";

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
