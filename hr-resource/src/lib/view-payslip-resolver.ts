import { Decimal } from "@prisma/client/runtime/library";
import { GraphQLError } from "graphql/error/GraphQLError.js";
import { PaymentStatus, PunchApprovalStatus, QueryResolvers, SyncStatus } from "./gql-codegen/graphql.js";
import prisma from "./prisma.js";
import { clocktimeEarningReducer } from "./utilities.js";

const qResolverViewPayslip: QueryResolvers['viewPayslip'] = async (
  _root,
  { payslipId },
  { roles, organization },
) => {

  if (!roles.some(role => role === "MANAGER" || role === "LEAD" || role === "EMPLOYEE")) {
    throw new GraphQLError(`User does not have permission to access this resource`, { extensions: { code: 'FORBIDDEN' } })
  }

  const mixedPayslipDocument = await prisma.payslip.findUnique({
    where: {
      id: payslipId
    },
    include: {
      ClockTime: true,
      employee: !roles.some(role => role === "EMPLOYEE" || role === "LEAD"),
    }
  });
  if (!mixedPayslipDocument) {
    throw new GraphQLError(`Payslip not found`, { extensions: { code: 'NOT_FOUND' } })
  }

  const { ClockTime, ...payslip } = mixedPayslipDocument;

  return {
    ...payslip,
    netPay: ClockTime.reduce(clocktimeEarningReducer, new Decimal(0)),
    paymentStatus: payslip.paymentStatus as PaymentStatus,
    employee: {
      ...payslip.employee,
      syncStatus: payslip.employee.syncStatus as SyncStatus,
    },
    clockTimes: ClockTime.map(clockTime => ({
      ...clockTime,
      approvalStatus: clockTime.approvalStatus as PunchApprovalStatus,
    })),
  }
}

export default qResolverViewPayslip;
