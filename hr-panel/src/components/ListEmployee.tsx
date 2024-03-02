import { useState } from 'react';
import List, { ListProps } from '@mui/material/List';
import { useQuery } from '@apollo/client';
import { LOAD_USERS } from '../lib/gql-queries';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

type ListEmployeeProps = Exclude<ListProps, 'type'>;
export default function ListEmployee(props: ListEmployeeProps) {

  const { data, loading } = useQuery(LOAD_USERS);

  return (
    <List {...props}>
      {data?.users.map((user, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar variant='rounded' sx={{ width: 36, height: 36 }}>{user?.firstName.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText primary={user?.firstName + " " + user?.lastName} secondary={user?.email} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
