import { Organization } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import cronParser from "cron-parser";
import dayjs from "dayjs";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";
import { generateInvoicePDF } from "./generate-payslip-document.js";
import { writeFile } from "fs";
import { Fs } from "../config/environment.js";
import { join } from "path";

/**
 * Generates a payslip for each employee, at the beginning of current payroll period.
 * @param {Organization} organization 
 */
export async function generatePayslips(organization: Organization) {
  // Estimate the period based on the cron expression
  const period = cronParser.parseExpression(
    organization.payrollCron!,
    {
      utc: true,
      startDate: organization.payrollStart ?? undefined,
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
            { approvalStatus: 'PENDING' },
            { payslipId: null },
          ]
        }
      });

    const payslip = await prisma.payslip
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
          ClockTime: { connect: orphanedClockTimes?.map(orphan => ({ id: orphan.id })) }
        },
        update: {
          ClockTime: { connect: orphanedClockTimes?.map(orphan => ({ id: orphan.id })) }
        },
        include: {
          ClockTime: true
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
      
    if (payslip) {
      const pdfBytes = await generateInvoicePDF(organization, employee, payslip, payslip.ClockTime);
      // Write pdf to disk with uuid as filename and update payslip table
      const pdfPath = join(Fs.outputDirectory, `${payslip.invoiceUuid}.pdf`);
      writeFile(pdfPath, pdfBytes, () => {
        logSystem.info(`Generated payslip for ${employee.email}`);
      });
    }
  }
}

/**
 * Generates the payroll at the end of the current cycle.
 * @param {Organization} organization 
 */
export async function generatePayroll(organization: Organization) {
  // Estimate the period based on the cron expression
  const period = cronParser.parseExpression(
    organization.payrollCron!,
    {
      utc: true,
      startDate: organization.payrollStart ?? dayjs().startOf('month').toDate(),
    }
  );

  // Gather all the payslips
  const payslips = await prisma.payslip.findMany({
    where: {
      AND: [
        { periodStart: { lte: period.prev().toDate() } },
        { periodEnd: { gte: period.next().toDate() } },
        { employee: { organizationId: organization.id } },
      ]
    },
    include: {
      employee: true,
      ClockTime: true
    }
  });

  // Upsert the payroll
  const payrollUpsertResult = await prisma.payroll
    .upsert({
      where: {
        organizationId_periodStart_periodEnd: {
          organizationId: organization.id,
          periodStart: period.prev().toDate(),
          periodEnd: period.next().toDate(),
        }
      },
      create: {
        organizationId: organization.id,
        periodStart: period.prev().toDate(),
        periodEnd: period.next().toDate(),
        generatedOn: new Date(),
        Payslip: { connect: payslips.map(payslip => ({ id: payslip.id })) }
      },
      update: {
        Payslip: { connect: payslips.map(payslip => ({ id: payslip.id })) }
      }
    })
    .catch(err => {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          logSystem.warn(`Payroll already exists for ${organization.name}`);
        }
      } else {
        logSystem.error(err);
      }
    });

  return payrollUpsertResult;
}