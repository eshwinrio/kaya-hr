import { styled } from "@mui/material/styles";

export default styled("span")(({ theme }) => ({
  background: `bottom/contain ${theme.palette.primary.main} url(${process.env.REACT_APP_COMPONENT_GRAPHIC_TEXT_BACKGROUND})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));
