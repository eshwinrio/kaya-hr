import Popover, { PopoverProps } from "@mui/material/Popover";
import { Link, LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMaterialTheme } from "../lib/material-theme";
import { signout } from "../lib/fetch-requests";
import { WhoAmIQuery } from "../lib/gql-codegen/graphql";

type PopoverProfileProps = Exclude<PopoverProps, "children">;

export default function PopoverProfile({ sx, ...props }: PopoverProfileProps) {
  const data = useLoaderData() as WhoAmIQuery;
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
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="body2" fontWeight="bold" sx={{ mb: 3 }}>{data.currentUser?.email}</Typography>
        <Avatar
          sx={{ width: 64, height: 64, mb: 1 }}
          alt={data.currentUser?.firstName}
          src="/static/images/avatar/1.jpg"
        />
        <Typography variant="h6">Hi, {data.currentUser?.firstName}!</Typography>
        <ButtonGroup sx={{ mt: 3 }}>
          <Button variant="outlined" color="primary" sx={{ width: "100%" }} startIcon={<SettingsIcon />}>
            Manage
          </Button>
          <Button variant="outlined" color="error" sx={{ width: "100%" }} startIcon={<LogoutIcon />} component={Link} to="/signout">
            Signout
          </Button>
        </ButtonGroup>
      </Box>
    </Popover>
  );
};

export const signoutLoader: LoaderFunction = async () => {
  const response = await signout();
  if (response.ok) {
    return redirect('/login');
  } else {
    return { error: 'Signout failed' };
  }
}
