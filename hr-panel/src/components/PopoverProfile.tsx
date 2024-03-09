import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Popover, { PopoverProps } from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Form, Link, LoaderFunction } from "react-router-dom";
import { signout } from "../lib/fetch-requests";
import { useMaterialTheme } from "../lib/material-theme";
import { useWhoAmI } from "../lib/whoami-provider";

type PopoverProfileProps = Exclude<PopoverProps, "children">;

export default function PopoverProfile({ sx, ...props }: PopoverProfileProps) {
  const data = useWhoAmI();
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
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 3 }}>{data?.currentUser?.email}</Typography>
          <Avatar
            sx={{ width: 64, height: 64, mb: 1 }}
            alt={data?.currentUser.firstName}
            src={data?.currentUser?.profileIconUrl ?? ''}
          />
          <Typography variant="h6">Hi, {data?.currentUser?.firstName}!</Typography>
          <ButtonGroup sx={{ mt: 3 }} >
            <Button variant="outlined" color="primary" sx={{ width: "100%" }} startIcon={<SettingsIcon />}>
              Manage
            </Button>
            <Button variant="outlined" color="error" sx={{ width: "100%" }} startIcon={<LogoutIcon />} component={Link} to="/signout">
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
