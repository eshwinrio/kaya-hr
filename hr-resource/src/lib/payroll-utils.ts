import { Organization } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import cronParser from "cron-parser";
import dayjs from "dayjs";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";


/**
 * Generates a payslip for each employee, for the current payroll period.
 * @param {Organization} organization 
 */
export async function generatePayslips(organization: Organization) {
  // Estimate the period based on the cron expression
  const period = cronParser.parseExpression(
    organization.payrollCron!,
    {
      utc: true,
      startDate: organization.payrollStart ?? dayjs().startOf('month').toDate(),
    }
  );

  // Assemble all the employees
  const employees = await prisma.user.findMany({
    where: {
      AND: [
        { organizationId: organization.id },
        { UserRoleMap: { some: { role: 'EMPLOYEE' } } },
        { position: { isNot: null } },
      ]
    }
  });

  // Upsert the payslip for each employee
  for (const employee of employees) {
    // If orphaned clock times are found, then connect them to the payslip upserted next
    const orphanedClockTimes = await prisma.user
      .findUnique({
        where: { id: employee.id },
      })
      .ClockTime({
        where: {
          AND: [
            { endTime: { lte: period.next().toDate() } },
            { paymentStatus: 'PENDING' },
            { payslipId: null },
          ]
        }
      });

    prisma.payslip
      .upsert({
        where: {
          employeeId_periodStart_periodEnd: {
            employeeId: employee.id,
            periodStart: period.prev().toDate(),
            periodEnd: period.next().toDate(),
          }
        },
        create: {
          employeeId: employee.id,
          periodStart: period.prev().toDate(),
          periodEnd: period.next().toDate(),
          generatedOn: new Date(),
          ClockTime: { connect: orphanedClockTimes?.map(orphan => ({ id: orphan.id }))}
        },
        update: {
          ClockTime: { connect: orphanedClockTimes?.map(orphan => ({ id: orphan.id }))}
        }
      })
      .catch(err => {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            logSystem.warn(`Payslip already exists for ${employee.email}`);
          }
        } else {
          logSystem.error(err);
        }
      });
  }
}
