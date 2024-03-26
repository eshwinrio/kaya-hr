import { Chip, Typography } from "@mui/material";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import { ListItemTextProps } from "@mui/material/ListItemText";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC } from "react";
import { FragmentType, gql, useFragment } from '../lib/gql-codegen';
import PunchTiming, { PunchTimingProps } from "./PunchTiming";
import { PaymentStatus } from "../lib/gql-codegen/graphql";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import PendingIcon from '@mui/icons-material/Pending';

const PunchHistoryFragment = gql(`
  fragment PunchHistory on ClockTime {
    id
    netHours
    hourlyWage
    earning
    paymentStatus
    ...PunchTiming
  }
`);

export interface PunchHistoryListItemProps extends ListItemProps {
  children?: never;
  readonly punchHistory: FragmentType<typeof PunchHistoryFragment>;
  readonly listItemButtonProps?: ListItemButtonProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly punchTimingProps?: Omit<PunchTimingProps, 'schedule'>;
}

const PunchHistoryListItem: FC<PunchHistoryListItemProps> = ({
  children,
  punchHistory,
  listItemButtonProps,
  listItemTextProps,
  punchTimingProps,
  ...props
}: PunchHistoryListItemProps) => {
  const punchHistoryFragment = useFragment(PunchHistoryFragment, punchHistory);

  return (
    <ListItem disablePadding {...props}>
      <ListItemButton>
        <Grid2 container justifyContent="space-between" sx={{ width: '100%' }}>
          <Grid2>
            <PunchTiming
              elevation={0}
              punchTiming={punchHistoryFragment}
            />
          </Grid2>
          <Grid2 container direction="column">
            <Typography variant="h5" fontWeight="bold" color="text.secondary">
              ${punchHistoryFragment.earning}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${punchHistoryFragment.hourlyWage}/hr
            </Typography>
            <Chip
              size="small"
              icon={punchHistoryFragment.paymentStatus === PaymentStatus.Completed
                ? <TaskAltIcon />
                : punchHistoryFragment.paymentStatus === PaymentStatus.Canceled
                  ? <NotInterestedIcon />
                  : <PendingIcon />
              }
              color={punchHistoryFragment.paymentStatus === PaymentStatus.Completed
                ? 'success'
                : punchHistoryFragment.paymentStatus === PaymentStatus.Canceled
                  ? 'error'
                  : 'warning'
              }
              label={punchHistoryFragment.paymentStatus.toLocaleLowerCase()}
              sx={{ mt: 1 }}
            />
          </Grid2>
        </Grid2>
      </ListItemButton>
    </ListItem>
  );
}

export default PunchHistoryListItem;
