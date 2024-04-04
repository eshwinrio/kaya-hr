import Button from "@mui/material/Button";
import Card, { CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { alpha } from "@mui/material/styles";
import { ChartsXAxis, ChartsYAxis, ResponsiveChartContainer } from "@mui/x-charts";
import { AreaPlot, LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { FC } from "react";
import dayjs from "../lib/dayjs";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";
import { useMaterialTheme } from "../lib/material-theme";

const fragment = gql(`
  fragment OutstandingAmountCard on PayrollsIndex {
    amountOutstanding
    previousPayrolls {
      id
      generatedOn
      netOutstanding
    }
  }
`);

interface OutstandingAmountCardProps extends CardProps {
  children?: never;
  readonly data: FragmentType<typeof fragment>;
}

const OutstandingAmountCard: FC<OutstandingAmountCardProps> = ({ data, ...props }) => {
  const fragmentData = useFragment(fragment, data);
  const theme = useMaterialTheme();
  const topColor = alpha(theme.palette.primary.main, 0.6);
  const bottomColor = alpha(theme.palette.primary.main, 0);

  return (
    <Card {...props}>
      <CardHeader
        title={`$${fragmentData.amountOutstanding}`}
        subheader={fragmentData.amountOutstanding === 0 ? "No outstanding payments" : "Total outstanding"}
      />
      <CardContent sx={{ minHeight: 300, height: "100%", overflow: "auto" }}>
        <ResponsiveChartContainer
          height={300}
          series={[
            {
              type: 'line',
              data: fragmentData.previousPayrolls.map(p => p.netOutstanding),
              area: true,
            }
          ]}
          xAxis={[
            {
              scaleType: 'utc',
              data: fragmentData.previousPayrolls.map(p => dayjs(p.generatedOn).toDate()),
              label: 'Payroll date',
            },
          ]}
          sx={{
            '.MuiAreaElement-root': {
              fill: 'url(#area-gradient)',
            },
            '.MuiLineElement-root': {
              stroke: 'url(#line-gradient)',
              strokeWidth: 4,
            },
            '.MuiMarkElement-root': {
              stroke: theme.palette.secondary.main,
              scale: '1.1',
              fill: '#fff',
              strokeWidth: 2,
            },
          }}>
          <defs>
            <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={topColor} />
              <stop offset="100%" stopColor={bottomColor} />
            </linearGradient>
            <linearGradient id="line-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={topColor} />
              <stop offset="100%" stopColor={bottomColor} />
            </linearGradient>
          </defs>
          <LinePlot />
          <AreaPlot />
          <MarkPlot />
          <ChartsXAxis
            disableLine
            disableTicks
            labelStyle={{ fill: 'rgba(0, 0, 0, 0.4)' }} />
          <ChartsYAxis
            disableLine
            disableTicks
            labelStyle={{ fill: 'rgba(0, 0, 0, 0.4)' }} />
        </ResponsiveChartContainer>
      </CardContent>
      <CardActions>
        <Button startIcon="✨" title="Generate payroll">Generate</Button>
      </CardActions>
    </Card>
  );
}

export default OutstandingAmountCard;
