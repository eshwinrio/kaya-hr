import List, { ListProps } from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { LoadAllUsersQuery } from '../lib/gql-codegen/graphql';

interface ListEmployeeProps extends ListProps {
  readonly data?: LoadAllUsersQuery;
  readonly error?: unknown;
  readonly loading?: boolean;
  children?: never;
  readonly avatarProps?: AvatarProps;
  readonly listItemProps?: ListItemProps;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemIconProps?: ListItemIconProps;
  readonly listItemTextProps?: ListItemTextProps;
}

export default function ListEmployee({
  data,
  error,
  loading,
  avatarProps,
  listItemProps,
  listItemButtonProps,
  listItemIconProps,
  listItemTextProps,
  ...props
}: ListEmployeeProps) {
  return (
    <List {...props}>
      {data?.users.map((user, index) => (
        <ListItem key={index} {...listItemProps}>
          <ListItemButton {...listItemButtonProps}>
            <ListItemIcon {...listItemIconProps}>
              <Avatar variant='rounded' sx={{ width: 36, height: 36 }} {...avatarProps}>{user?.firstName.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText primary={user?.firstName + " " + user?.lastName} secondary={user?.email} {...listItemTextProps} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
