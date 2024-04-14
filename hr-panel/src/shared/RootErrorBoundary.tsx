import { ErrorOutline } from "@mui/icons-material";
import { Container } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren } from "react";
import { useRouteError } from "react-router-dom";

const RootErrorBoundary: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const error = useRouteError() as Error;
  console.dir(error);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <ErrorOutline fontSize="large" sx={{ color: "error.main", mb: 2 }} />
          <Typography variant="h6">{error.message}</Typography>
          {process.env.NODE_ENV === "development" && (
            <Alert sx={{ mt: 2, width: "100%", fontFamily: "monospace" }} severity="error">{error.stack}</Alert>
          )}
        </Box>
      </Container>
    </>
  );
};

export default RootErrorBoundary;
