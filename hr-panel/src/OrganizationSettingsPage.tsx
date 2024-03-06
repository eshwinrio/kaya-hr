import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ActionFunction, Form } from "react-router-dom";
import Banner from "./components/Banner";
import { apolloClient } from "./lib/apollo";
import { UPDATE_ORGANIZATION } from "./lib/gql-queries";
import { useMaterialTheme } from "./lib/material-theme";
import { useWhoAmI } from "./lib/whoami-provider";

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
        mb: 2,
        height: isAboveXs ? 300 : 200
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
        <input type="hidden" name="id" value={whoAmI?.currentUser?.organization?.id} />
        <Grid2 container gap={4} direction='column'>
          <Grid2 xs={12} sm={4}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              defaultValue={whoAmI?.currentUser?.organization?.name || ''}
              onChange={(e) => {/* handle name change */ }}
            />
          </Grid2>
          <Grid2 xs={12} sm={8}>
            <TextField
              label="About"
              name="summary"
              variant="outlined"
              multiline
              fullWidth
              rows={4}
              defaultValue={whoAmI?.currentUser?.organization?.summary || ''}
              onChange={(e) => {/* handle summary change */ }}
            />
          </Grid2>
        </Grid2>
        <Button type="submit" variant="contained" fullWidth={!isAboveXs} sx={{ mt: 4 }}>
          Update
        </Button>
        <br />
        <Typography variant="caption" sx={{ pb: 4 }}>
          Reload page after updating for changes to take effect
        </Typography>
      </Form>
    </Container >
  );
}

export const organizationSettingsAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = parseInt(formData.get('id')?.toString()!, 10);
  if (!id) {
    return null;
  }
  const name = formData.get('name')?.toString();
  const summary = formData.get('summary')?.toString();
  return await apolloClient.mutate({
    mutation: UPDATE_ORGANIZATION,
    variables: { id, input: { name, summary } },
  });
}
