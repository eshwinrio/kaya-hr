import { AvatarProps } from '@mui/material/Avatar';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { FragmentType, gql, useFragment } from '../lib/gql-codegen';
import UserAvatar from './UserAvatar';

const fragment = gql(`
  fragment UserListItem on User {
    id
    firstName
    lastName
    email
    ...Avatar
  }
`);

interface ListEmployeeProps extends ListItemProps {
  children?: never;
  readonly user: FragmentType<typeof fragment>;
  readonly avatarProps?: AvatarProps;
  readonly listItemButtonProps?: Exclude<ListItemButtonProps, 'component'>;
  readonly listItemIconProps?: ListItemIconProps;
  readonly listItemTextProps?: ListItemTextProps;
}

export default function UserListItem({
  user,
  avatarProps,
  listItemButtonProps,
  listItemIconProps,
  listItemTextProps,
  ...props
}: ListEmployeeProps) {
  const fragmentData = useFragment(fragment, user);
  return (
    <ListItem {...props}>
      <ListItemButton component={Link} to={`/employees/view/${fragmentData.id}`} {...listItemButtonProps}>
        <ListItemIcon {...listItemIconProps}>
          <UserAvatar {...avatarProps} user={fragmentData} />
        </ListItemIcon>
        <ListItemText primary={fragmentData?.firstName + " " + fragmentData?.lastName} secondary={fragmentData?.email} {...listItemTextProps} />
      </ListItemButton>
    </ListItem>
  )
}
