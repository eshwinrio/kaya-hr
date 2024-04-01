import { GraphQLError } from "graphql";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs";
import { Fs } from "../config/environment.js";
import { generateInvoicePDF } from "./generate-payslip-document.js";
import { MutationResolvers } from "./gql-codegen/graphql.js";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";

export const mGeneratePayslipResolver: MutationResolvers["generateInvoice"] = async (
  _parent,
  { payslipId },
  { roles, organization, user }
) => {
  const payslip = await prisma.payslip.findUnique({
    where: {
      id: payslipId,
      employee: {
        organizationId: organization.id,
        id: roles.every(role => role === "EMPLOYEE") ? user.id : undefined
      }
    },
    include: { ClockTime: true },
  });

  if (!payslip) {
    throw new GraphQLError("Payslip not found", { extensions: { code: "NOT_FOUND" } });
  }

  const pdfUuid = payslip.invoiceUuid ?? randomUUID();

  const pdfBytes = await generateInvoicePDF(organization, user, payslip, payslip?.ClockTime);
  const pdfPath = `${Fs.outputDirectory}/${pdfUuid}.pdf`;
  writeFile(pdfPath, pdfBytes, () => {
    logSystem.info(`Generated payslip for ${user.email}`);
    if (!payslip.invoiceUuid) {
      prisma.payslip.update({
        where: {
          id: payslipId
        },
        data: {
          invoiceUuid: pdfUuid
        }
      })
    }
  });

  return pdfUuid;
}

export default mGeneratePayslipResolver;
