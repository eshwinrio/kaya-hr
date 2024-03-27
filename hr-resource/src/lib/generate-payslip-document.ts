import { Organization, Payroll, User } from '@prisma/client';
import { PDFDocument, PDFPage, PDFPageDrawTextOptions, PageSizes, StandardFonts } from 'pdf-lib';

export default async function generatePayslipPDF(
  employee: User,
  organization: Organization,
  payroll: Payroll
) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page: PDFPage = pdfDoc.addPage(PageSizes.Letter);

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
