import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useWhoAmI } from "./lib/whoami-provider";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  const whoAmI = useWhoAmI();
  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h6" fontWeight="bold">Settings</Typography>
      </Toolbar>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={6} lg={4}>
          <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="organization">
              <CardMedia image={whoAmI?.currentUser?.organization?.bannerUrl || "https://unsplash.com/photos/random"} sx={{ height: 164 }} />
              <CardContent>
                <Typography variant="caption">My organization</Typography>
                <Typography variant="h5" fontWeight="bold">{whoAmI?.currentUser?.organization?.name}</Typography>
                <Typography variant="body2" textOverflow="ellipsis" sx={{ maxHeight: 100, overflow: 'hidden', mb: 2 }}>{whoAmI?.currentUser?.organization?.summary}</Typography>
                <Typography variant="button" color="text.secondary">Open organization settings</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}
