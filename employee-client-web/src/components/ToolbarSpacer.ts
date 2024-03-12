import { styled } from "@mui/material/styles";

export default styled('div')(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
}));
