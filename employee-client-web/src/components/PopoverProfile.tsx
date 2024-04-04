import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Popover, { PopoverProps } from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Form, Link, LoaderFunction } from "react-router-dom";
import { signout } from "../lib/fetch-requests";
import { useMaterialTheme } from "../lib/material-theme";
import UserAvatar from "./UserAvatar";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";

export const ProfileFragment = gql(`
  fragment Profile on User {
    email
    firstName
    middleName
    lastName
    ...Avatar
  }
`);

interface PopoverProfileProps extends PopoverProps {
  children?: never;
  user: FragmentType<typeof ProfileFragment>;
}

export default function PopoverProfile({ sx, user, ...props }: PopoverProfileProps) {
  const profileFragment = useFragment(ProfileFragment, user);
  const theme = useMaterialTheme();

  return (
    <Popover {...props} sx={{
      '& .MuiPaper-root': {
        padding: theme.spacing(2),
        maxWidth: theme.breakpoints.values.xs,
        width: "100%",
      },
      ...sx
    }}>
      <Form method="delete">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 3 }}>{profileFragment.email}</Typography>
          <UserAvatar
            sx={{ width: 64, height: 64, mb: 1 }}
            user={profileFragment}
          />
          <Typography variant="h6">Hi, {profileFragment.firstName}!</Typography>
          <ButtonGroup sx={{ mt: 3 }} >
            <Button variant="outlined" color="primary" sx={{ width: "100%" }} startIcon={<SettingsIcon />}>
              Manage
            </Button>
            <Button variant="outlined" color="error" sx={{ width: "100%" }} startIcon={<LogoutIcon />} component={Link} to="/auth/signout">
              Signout
            </Button>
          </ButtonGroup>
        </Box>
      </Form>
    </Popover>
  );
};

export const signoutLoader: LoaderFunction = async () => {
  const response = await signout();
  if (response.ok) {
    window.location.reload();
  }
  return null;
}
