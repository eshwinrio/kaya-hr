import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { FragmentType, gql, useFragment } from '../lib/gql-codegen';

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
    <ListItem {...props}>
      <ListItemButton>
        <Grid2 container direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
          <Grid2 xs='auto'>
            <ListItemText
              {...listItemTextProps}
              primary={fragmentData.employee.firstName + " " + fragmentData.employee.lastName}
              secondary={fragmentData.employee.email}
            />
          </Grid2>
          <Grid2 xs='auto'>
            <ListItemText
              {...listItemTextProps}
              primary={fragmentData.employee.firstName + " " + fragmentData.employee.lastName}
              secondary={fragmentData.employee.email}
            />
          </Grid2>
        </Grid2>
      </ListItemButton>
    </ListItem>
  );
}
