import { alpha, styled } from "@mui/material/styles";

export default styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[400], 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[400], 0.25),
  },
}));
