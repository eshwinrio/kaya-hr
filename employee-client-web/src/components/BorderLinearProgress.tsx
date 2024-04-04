import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export default styled(LinearProgress)(({ theme }) => ({
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
