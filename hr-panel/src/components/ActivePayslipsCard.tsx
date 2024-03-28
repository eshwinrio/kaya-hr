import Button from "@mui/material/Button";
import Card, { CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import { FC } from "react";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";
import PayslipListItem from "./PayslipListItem";

const fragment = gql(`
  fragment ActivePayslipsCard on PayrollsIndex {
    activePayslips {
      id
      ...PayslipListItem
    }
  }
`);

interface ActivePayslipsCardProps extends CardProps {
  children?: never;
  readonly data: FragmentType<typeof fragment>;
}

const ActivePayslipsCard: FC<ActivePayslipsCardProps> = ({ data, ...props }) => {
  const fragmentData = useFragment(fragment, data);
  return (
    <Card {...props}>
      <CardHeader
        title="Active Payslips"
        subheader={`${fragmentData?.activePayslips?.length ?? 0} payslip${fragmentData?.activePayslips?.length === 1 ? "" : "s"}`}
      />
      <List dense>
        {fragmentData.activePayslips.map((payslip) => <PayslipListItem key={payslip.id} disablePadding payslip={payslip} />)}
      </List>
      <CardActions>
        <Button startIcon="✨" title="Generate payroll">Generate</Button>
      </CardActions>
    </Card>
  );
}

export default ActivePayslipsCard;
