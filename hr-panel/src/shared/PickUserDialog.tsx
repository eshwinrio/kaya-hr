import { useQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { AvatarProps } from '@mui/material/Avatar';
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List, { ListProps } from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { FC, useState } from "react";
import { PickUserDialogQuery, Role } from "../lib/gql-codegen/graphql";
import SearchIconWrapper from "../components/SearchIconWrapper";
import SearchWidget from "../components/SearchWidget";
import SearchWidgetInputBase from "../components/SearchWidgetInputBase";
import { gql } from '../lib/gql-codegen';
import UserAvatar from '../components/UserAvatar';

interface PickUserDialogProps extends DialogProps {
  children?: never;
  readonly listProps?: ListProps;
  readonly listItemProps?: ListItemProps;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemIconProps?: ListItemIconProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly avatarProps?: AvatarProps;
  readonly onPick?: (userId: PickUserDialogQuery['users'][number]) => void;
}

const query = gql(`
  query PickUserDialog($options: ListUsersFilter!) {
    users(options: $options) {
      id
      firstName
      lastName
      email
      ...Avatar
    }
  }
`);

const PickUserDialog: FC<PickUserDialogProps> = ({
  listProps,
  listItemProps,
  listItemButtonProps,
  listItemIconProps,
  listItemTextProps,
  avatarProps,
  onPick = () => {},
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useQuery(query, {
    variables: { options: { searchTerm, roles: [Role.Employee], limit: 5 } },
  });

  return (
    <Dialog {...props}>
      <DialogTitle>Choose User</DialogTitle>
      <Toolbar>
        <SearchWidget sx={{ width: '100%' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchWidgetInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </SearchWidget>
      </Toolbar>
      <List dense {...listProps}>
        {data?.users.map((user, index) => (
          <ListItem key={index} {...listItemProps}>
            <ListItemButton {...listItemButtonProps} onClick={onPick.bind(null, user)}>
              <ListItemIcon {...listItemIconProps}>
                <UserAvatar user={user} />
              </ListItemIcon>
              <ListItemText primary={user?.firstName + " " + user?.lastName} secondary={user?.email} {...listItemTextProps} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default PickUserDialog;
