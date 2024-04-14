import cronParser from "cron-parser";
import dayjs from '../../../dayjs.js';
import { PayslipsIndexPage, QueryResolvers, Role } from '../../../gql-codegen/graphql.js';
import prisma from '../../../prisma.js';
import { onlyAllow } from '../../../utilities.js';

const qResolverPayslipsIndex: QueryResolvers['payslipsIndex'] = async (
  _root,
  _args,
  context,
) => {
  onlyAllow.bind(context)(Role.Admin, Role.Manager);

  const totalPayslipCount: PayslipsIndexPage['totalPayslipCount'] = await prisma.payslip
    .count({
      where: {
        employee: { organizationId: context.organization.id },
      },
    })

  const currentCycle = cronParser.parseExpression(
    context.organization.payrollCron,
    { startDate: context.organization.payrollStart ?? dayjs().startOf('month').toDate() }
  );

  const currentCycleStart = currentCycle.prev().toDate();
  const currentCycleEnd = currentCycle.next().toDate();

  const currentPeriodPayslipCount: PayslipsIndexPage['currentPeriodPayslipCount'] = await prisma.payslip
    .count({
      where: {
        employee: { organizationId: context.organization.id },
        periodStart: { gte: currentCycleStart, lte: currentCycleEnd },
        periodEnd: { gte: currentCycleStart, lte: currentCycleEnd },
      }
    });

  return { totalPayslipCount, currentPeriodPayslipCount };
};

export default qResolverPayslipsIndex;
export { default as qResolverViewPayslip } from './view.js';
