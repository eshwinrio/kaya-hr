import { Paper, styled } from "@mui/material";

export default styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  }
}));
