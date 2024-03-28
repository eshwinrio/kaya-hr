import ReceiptIcon from '@mui/icons-material/Receipt';
import IconButton from "@mui/material/IconButton";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { FragmentType, gql, useFragment } from '../lib/gql-codegen';
import UserAvatar from "./UserAvatar";

const fragment = gql(`
  fragment PayslipListItem on Payslip {
    id
    netPay
    deductions
    paymentMethod
    generatedOn
    employee {
      id
      firstName
      lastName
      email
      ...Avatar
    }
  }
`);

export interface PayslipListItemProps extends ListItemProps {
  children?: never;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly payslip: FragmentType<typeof fragment>;
}

export default function PayslipListItem({
  listItemButtonProps,
  listItemTextProps,
  payslip,
  ...props
}: PayslipListItemProps) {
  const fragmentData = useFragment(fragment, payslip);

  return (
    <ListItem {...props} secondaryAction={(
      <IconButton edge="end" aria-label="receipt">
        <ReceiptIcon />
      </IconButton>
    )}>
      <ListItemButton>
        <ListItemAvatar>
          <UserAvatar user={fragmentData.employee} />
        </ListItemAvatar>
        <ListItemText
          {...listItemTextProps}
          primary={fragmentData.employee.firstName + " " + fragmentData.employee.lastName}
          secondary={fragmentData.employee.email}
        />
        <Typography variant="subtitle1" fontWeight="bold">${fragmentData.netPay}</Typography>
      </ListItemButton>
    </ListItem>
  );
}
