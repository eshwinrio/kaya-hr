import { Payroll } from "@prisma/client";
import dayjs from "dayjs";
import prisma from "./prisma.js";

export async function generatePayslips(payroll: Payroll) {
  const employees = await prisma.user.findMany({
    include: {
      ClockTime: true
    },
    where: {
      AND: [
        { organizationId: payroll.organizationId },
        { ClockTime: {
          some: {
            paymentStatus: 'PENDING',
            endTime: { lte: payroll.periodEnd }
          }
        } }
      ]
    }
  });
  await prisma.payslip.createMany({
    data: employees.map((employee) => {
      return {
        payrollId: payroll.id,
        employeeId: employee.id,
        generatedOn: new Date(),
        netPay: employee.ClockTime.reduce((sum, clock) => sum + (dayjs(clock.endTime).diff(dayjs(clock.startTime), 'hour') * clock.hourlyWage.toNumber()), 0),
        organizationId: payroll.organizationId,
        userId: employee.id
      }
    }),
    skipDuplicates: true
  })
}
