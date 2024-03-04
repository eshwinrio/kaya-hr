import Container from "@mui/material/Container";
import { useWhoAmI } from "./lib/whoami-provider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Form } from "react-router-dom";
import AvatarGroup from "@mui/material/AvatarGroup";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useMaterialTheme } from "./lib/material-theme";
import useMediaQuery from "@mui/material/useMediaQuery";

// TODO: Replace dummy data with query data
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Carlos Abbott',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function OrganizationSettingsPage() {
  const whoAmI = useWhoAmI();
  const materialTheme = useMaterialTheme();
  const isAboveXs = useMediaQuery(materialTheme.breakpoints.up('xs'));

  return (
    <Container maxWidth="lg">
      <Banner sx={{
        backgroundImage: `url(${whoAmI?.currentUser?.organization?.bannerUrl})`,
        mb: 2
      }}>
        <Grid2 container gap={1}>
          <Grid2>
            <Avatar
              src={whoAmI?.currentUser?.organization?.logoUrl || ''}
              sx={{ width: 64, height: 64, border: 2, borderColor: 'white' }}
            />
          </Grid2>
          <Grid2>
            <Typography variant="h4" color='white' sx={{ mixBlendMode: 'lighten' }}>
              {whoAmI?.currentUser?.organization?.name}
            </Typography>
            <Typography variant="body2" color='white' sx={{ mixBlendMode: 'lighten' }}>
              {whoAmI?.currentUser?.organization?.summary}
            </Typography>
          </Grid2>
        </Grid2>
      </Banner>
      <Typography variant="caption">Managed by</Typography>
      <AvatarGroup
        total={names.length}
        sx={{ justifyContent: 'flex-end', mb: 5 }}
        slotProps={{
          additionalAvatar: { sx: { width: 32, height: 32 } }
        }}>
        {names.map((value) => (
          <Tooltip title={value}>
            <Avatar
              key={value}
              src={whoAmI?.currentUser?.organization?.logoUrl || ''}
              sx={{ width: 32, height: 32 }}
            />
          </Tooltip>
        ))}
      </AvatarGroup>

      <Form method="post">
        <Grid2 container gap={4} direction='column'>
          <Grid2 xs={12} sm={4}>
            <TextField
              label="Organization Name"
              variant="outlined"
              fullWidth
              value={whoAmI?.currentUser?.organization?.name || ''}
              onChange={(e) => {/* handle name change */ }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Organization Summary"
              variant="outlined"
              multiline
              fullWidth
              rows={4}
              value={whoAmI?.currentUser?.organization?.summary || ''}
              onChange={(e) => {/* handle summary change */ }}
            />
          </Grid2>
        </Grid2>
        <Button type="submit" variant="contained" fullWidth={!isAboveXs} sx={{ mt: 4 }}>
          Update
        </Button>
      </Form>
    </Container >
  );
}

const Banner = styled(Box)(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundBlendMode: 'soft-light',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: 200,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
}));
