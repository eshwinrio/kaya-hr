import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";


export interface PayrollSummaryProps extends BoxProps {}

const PayrollSummary: FC<PayrollSummaryProps> = props => {
  return <Box {...props}>
    <Grid2 container spacing={2}>
      <Grid2 xs={4}>
        <Box sx={{ display: "flex", flexDirection: "column", borderLeft: "3px solid #e0e0e0", pl: 1 }}>
          <Typography variant="caption">Payment</Typography>
          <Typography variant="subtitle2">$9870.00</Typography>
        </Box>
      </Grid2>
      <Grid2 xs={4}>
        <Box sx={{ display: "flex", flexDirection: "column", borderLeft: "3px solid #ff9800", pl: 1 }}>
          <Typography variant="caption">Pending</Typography>
          <Typography variant="subtitle2">$9870.00</Typography>
        </Box>
      </Grid2>
      <Grid2 xs={4}>
        <Box sx={{ display: "flex", flexDirection: "column", borderLeft: "3px solid #4caf50", pl: 1 }}>
          <Typography variant="caption">Paid</Typography>
          <Typography variant="subtitle2">$0.00</Typography>
        </Box>
      </Grid2>
    </Grid2>
  </Box>;
};

export default PayrollSummary;
