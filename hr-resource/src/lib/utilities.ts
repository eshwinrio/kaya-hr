import { ClockTime, Payslip } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "./dayjs.js";

export const clocktimeEarningReducer = (
  accumulator: Decimal,
  { startTime, endTime, hourlyWage }: ClockTime
) => accumulator.add(dayjs(endTime).diff(startTime, 'hour') * hourlyWage.toNumber());
