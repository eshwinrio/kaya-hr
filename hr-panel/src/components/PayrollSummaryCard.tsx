import Alert from "@mui/material/Alert";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { PieChart } from "@mui/x-charts/PieChart";
import { FC } from "react";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";

const fragment = gql(`
  fragment PayrollSummaryCard on PayrollSummary {
    payrollId
    periodStart
    periodEnd
    totalTasks
    pendingTasks
    completedTasks
    rejectedTasks
  }
`);

interface PayrollSummaryCardProps extends CardProps {
  children?: never;
  readonly data?: FragmentType<typeof fragment> | null;
}

const PayrollSummaryCard: FC<PayrollSummaryCardProps> = ({ data, ...props }) => {
  const fragmentData = useFragment(fragment, data);
  return (
    <Card {...props}>
      <CardHeader
        title="Payroll Summary"
        subheader={fragmentData
          ? `You have ${fragmentData.pendingTasks} pending tasks`
          : "Summary unavailable"
        }
      />
      <CardContent>
        {fragmentData
          ? (
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Paid" },
                    { id: 1, value: 15, label: "Pending" },
                    { id: 2, value: 20, label: "Cancelled" },
                  ],
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -10, color: 'gray' },
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                },
              ]}
              slotProps={{
                legend: { hidden: true },
              }}
              margin={{ right: 5 }}
              height={300}
              width={300}
            />
          )
          : (
            <Alert severity="info">
              No data to display
            </Alert>
          )
        }
      </CardContent>
    </Card>
  );
}

export default PayrollSummaryCard;
