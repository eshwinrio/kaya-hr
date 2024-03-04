import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

export default styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '17ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
