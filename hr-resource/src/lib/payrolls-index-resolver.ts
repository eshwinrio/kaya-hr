import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import cronParser from "cron-parser";
import { GraphQLError } from "graphql/error/GraphQLError.js";
import dayjs from "./dayjs.js";
import { PaymentStatus, Payroll, PayrollSummary, Payslip, QueryResolvers, SyncStatus } from "./gql-codegen/graphql.js";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";
import { clocktimeEarningReducer } from "./utilities.js";

const qResolverPayrollsIndex: QueryResolvers['payrollsIndex'] = async (
  _root,
  _args,
  { roles, organization },
) => {

  if (!roles.some(role => role === "MANAGER" || role === "LEAD")) {
    throw new GraphQLError(`User does not have permission to access this resource`, { extensions: { code: 'FORBIDDEN' } })
  }

  const currentCycle = cronParser.parseExpression(organization.payrollCron, {
    startDate: organization.payrollStart ?? dayjs().startOf('month').toDate(),
  });

  const currentCycleStart = currentCycle.prev().toDate();
  const currentCycleEnd = currentCycle.next().toDate();

  const amountOutstanding = await prisma.payslip
    .findMany({
      where: {
        employee: { organizationId: organization.id },
        periodStart: { gte: currentCycleStart, lte: currentCycleEnd },
        periodEnd: { gte: currentCycleStart, lte: currentCycleEnd },
      },
      include: {
        ClockTime: true
      }
    })
    .then(payslips => {
      return payslips.reduce(
        (payslipAmountAccumulator, { ClockTime }) => payslipAmountAccumulator.add(
          ClockTime.reduce(clocktimeEarningReducer, new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP))
        ),
        new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
      )
    })
    .catch(error => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError(``, { extensions: { code: 'NOT_FOUND' } })
        }
        logSystem.error(error.stack);
      }
      logSystem.error(error);
      throw new GraphQLError('Could not query payrolls', { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
    });

  const previousPayrolls: Array<Payroll> = await prisma.payroll.findMany({
    where: {
      periodEnd: {
        lt: currentCycleStart
      },
      organizationId: roles.includes("SUPER") ? undefined : organization?.id,
    },
    include: {
      Payslip: {
        include: {
          ClockTime: true
        }
      }
    },
    orderBy: {
      periodEnd: 'desc'
    },
    take: 7
  }).then(payrolls => payrolls.map(payroll => ({
    ...payroll,
    netOutstanding: payroll.Payslip.reduce(
      (acc, { ClockTime }) => acc.add(ClockTime.reduce(
        (acc, clockTime) => acc + (dayjs(clockTime.endTime).diff(clockTime.startTime, 'hour') * clockTime.hourlyWage.toNumber()),
        0
      )),
      new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    ),
  })));

  const activePayslips: Array<Payslip> = await prisma.payslip.findMany({
    where: {
      periodStart: {
        gte: currentCycleStart,
        lte: currentCycleEnd
      },
      periodEnd: {
        gte: currentCycleStart,
        lte: currentCycleEnd
      },
      employee: {
        organizationId: roles.includes("SUPER") ? undefined : organization?.id,
      }
    },
    include: {
      employee: true,
      ClockTime: true
    }
  })
    .then(payslips => payslips.map(({ ClockTime, employee, paymentStatus, ...payslip }) => ({
      ...payslip,
      netPay: ClockTime.reduce(
        clocktimeEarningReducer,
        new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
      ),
      employee: {
        ...employee,
        syncStatus: employee.syncStatus as SyncStatus
      },
      paymentStatus: paymentStatus as PaymentStatus,
    })))
    .catch(error => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError(``, { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      logSystem.error(error);
      throw new GraphQLError('Could not query payrolls', { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
    });

  const currentPayrollSummary: PayrollSummary | null = await prisma.payroll.findUnique({
    where: {
      organizationId_periodStart_periodEnd: {
        organizationId: organization.id,
        periodStart: currentCycleStart,
        periodEnd: currentCycleEnd
      }
    },
    include: {
      Payslip: {
        include: {
          ClockTime: true
        }
      }
    }
  }).then(payroll => {
    if (!payroll) return null;
    const { Payslip } = payroll;
    return {
      payrollId: payroll.id,
      periodStart: payroll.periodStart,
      periodEnd: payroll.periodEnd,
      totalTasks: payroll.Payslip.length,
      pendingTasks: Payslip.filter(({ paymentStatus }) => paymentStatus === 'PENDING').length,
      completedTasks: Payslip.filter(({ paymentStatus }) => paymentStatus === 'COMPLETED').length,
      rejectedTasks: Payslip.filter(({ paymentStatus }) => paymentStatus === 'CANCELED').length,
    }
  });

  return {
    week: dayjs().week(),
    year: dayjs().year(),
    currentCycleStart: currentCycleStart,
    currentCycleEnd: currentCycleEnd,
    amountOutstanding,
    previousPayrolls,
    activePayslips,
    currentPayrollSummary,
  }
}

export default qResolverPayrollsIndex;
