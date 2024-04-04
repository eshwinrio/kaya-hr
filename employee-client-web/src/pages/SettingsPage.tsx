import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function SettingsPage() {
  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h6" fontWeight="bold">Settings</Typography>
      </Toolbar>
    </Container>
  );
}
