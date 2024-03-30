import { useQuery } from '@apollo/client';
import { AvatarProps } from '@mui/material/Avatar';
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List, { ListProps } from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { FC } from "react";
import { gql } from '../lib/gql-codegen';
import { PositionPickerQuery } from "../lib/gql-codegen/graphql";

const query = gql(`
  query PositionPicker {
    positionPicker {
      id
      title
      description
      hourlyWage
      users {
        ...Avatar
      }
    }
  }
`);

interface PositionPickerProps extends DialogProps {
  children?: never;
  readonly listProps?: ListProps;
  readonly listItemProps?: ListItemProps;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemIconProps?: ListItemIconProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly avatarProps?: AvatarProps;
  readonly onPick?: (position: PositionPickerQuery['positionPicker'][number]) => void;
}

const PositionPicker: FC<PositionPickerProps> = ({
  listProps,
  listItemProps,
  listItemButtonProps,
  listItemIconProps,
  listItemTextProps,
  avatarProps,
  onPick = () => {},
  ...props
}) => {
  const queryResult = useQuery(query);

  return (
    <Dialog {...props}>
      <DialogTitle>Available Positions</DialogTitle>
      <List dense {...listProps}>
        {queryResult.data?.positionPicker.map((position, index) => (
          <ListItem key={index} {...listItemProps}>
            <ListItemButton {...listItemButtonProps} onClick={onPick.bind(null, position)}>
              <ListItemText primary={position?.title} secondary={position?.description} {...listItemTextProps} />
              <Typography variant="body2">{position?.hourlyWage}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default PositionPicker;
