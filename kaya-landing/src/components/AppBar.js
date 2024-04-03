import MuiAppBar from "@mui/material/AppBar";
import { alpha, styled } from "@mui/material/styles";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.72),
  backdropFilter: "blur(10px) saturate(180%)",
  color: theme.palette.text.primary,
  boxShadow: "none",
}));

export default AppBar;
