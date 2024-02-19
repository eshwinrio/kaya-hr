import Popover, { PopoverProps } from "@mui/material/Popover";
import { ActionFunction, Link, useLoaderData } from "react-router-dom";
import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMaterialTheme } from "../lib/material-theme";
import { signout } from "../lib/fetch-requests";

type PopoverProfileProps = Exclude<PopoverProps, "children">;
type Users = {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  password: string;
}

export default function PopoverProfile({ sx, ...props }: PopoverProfileProps) {
  const data = useLoaderData() as Users;
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
        <Typography variant="body2" fontWeight="bold" sx={{ mb: 3 }}>{data.email}</Typography>
        <Avatar
          sx={{ width: 64, height: 64, mb: 1 }}
          alt={data.firstName}
          src="/static/images/avatar/1.jpg"
        />
        <Typography variant="h6">Hi, {data.firstName}!</Typography>
        <ButtonGroup sx={{ mt: 3 }}>
          <Button variant="outlined" color="primary" sx={{ width: "100%" }} startIcon={<SettingsIcon />}>
            Manage
          </Button>
          <Button variant="outlined" color="error" sx={{ width: "100%" }} startIcon={<LogoutIcon />} component={Link} to="/login">
            Signout
          </Button>
        </ButtonGroup>
      </Box>
    </Popover>
  );
};

export const signoutAction: ActionFunction = async () => {
  const response = await signout();
  if (response.ok) {
    return null;
  } else {
    return { error: 'Signout failed' };
  }
}
