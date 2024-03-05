import Avatar, { AvatarProps } from '@mui/material/Avatar';
import List, { ListProps } from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { LoadAllUsersQuery } from '../lib/gql-codegen/graphql';

interface ListEmployeeProps extends ListProps {
  readonly data?: LoadAllUsersQuery;
  readonly error?: unknown;
  readonly loading?: boolean;
  children?: never;
  readonly avatarProps?: AvatarProps;
  readonly listItemProps?: ListItemProps;
  readonly listItemButtonProps?: Exclude<ListItemButtonProps, 'component'>;
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
          <ListItemButton component={Link} to={`/employees/view/${user?.id}`} {...listItemButtonProps}>
            <ListItemIcon {...listItemIconProps}>
              <Avatar {...avatarProps}>{user?.firstName.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText primary={user?.firstName + " " + user?.lastName} secondary={user?.email} {...listItemTextProps} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
