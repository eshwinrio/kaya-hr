import { Organization } from "@prisma/client";
import prisma from "./prisma.js";
import { ScheduledTask, schedule, validate } from "node-cron";
import { generatePayslips } from "./payroll-utils.js";

/** The type of the cron job */
export type CronJobFn = (now: Date | "manual" | "init") => void;

interface PayrollCronJobPool {
  [key: Organization['id']]: ScheduledTask;
  addCronJob(orgId: Organization['id'], job: any): void;
  removeCronJob(orgId: Organization['id']): void;
}

const cronJobs: PayrollCronJobPool = {
  addCronJob: (orgId: Organization['id'], job: any) => {
    cronJobs[orgId] = job;
  },
  removeCronJob: (orgId: Organization['id']) => {
    if (cronJobs[orgId]) {
      cronJobs[orgId].stop();
      delete cronJobs[orgId];
    }
  },
};

export async function initPayrollCron() {
  const payrollEnabledOrgs = await prisma.organization.findMany({
    where: { enablePayrollJob: true }
  });
  payrollEnabledOrgs
    .filter(org => validate(org.payrollCron!))
    .forEach(org => {
      cronJobs.addCronJob(
        org.id,
        schedule(org.payrollCron!, now => {
          generatePayslips(org);
        })
      )
  });
}
