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

  // Add organization details
  page.drawText(organization.name, { x: 50, y: 750, size: 20, font });
  page.drawText(organization.summary || '', { x: 50, y: 730, size: 10, font });

  // Add pay date
  const payDateTextOptions: PDFPageDrawTextOptions = { x: 50, y: 700, size: 10, font };
  page.drawText(`Pay Date: ${payroll.dispensedOn?.toLocaleString() || ''}`, payDateTextOptions);

  // Add employee details section
  const employeeDetailTextOptions: PDFPageDrawTextOptions = { x: 50, y: 670, size: 10, font };
  page.drawText(`Employee Name: ${employee.firstName} ${employee.lastName}`, employeeDetailTextOptions);
  page.drawText(`Employee ID: ${employee.id}`, employeeDetailTextOptions);

  // Add deductions section title
  const deductionsSectionY = 560;
  const deductionsTitleOptions: PDFPageDrawTextOptions = { x: 200, y: deductionsSectionY, size: 11, font };
  page.drawText('Deductions', deductionsTitleOptions);

  // Add individual deductions
  let deductionsY = deductionsSectionY - 10;
  for (const deduction in payroll.deductions) {
    const deductionTextOptions: PDFPageDrawTextOptions = { x: 200, y: deductionsY, size: 10, font };
    page.drawText(`${deduction}: $${payroll.deductions.toFixed(2)}`, deductionTextOptions);
    deductionsY -= 10;
  }

  // Add net pay section title
  const netPaySectionY = Math.min(deductionsY, 560 - 30);
  const netPayTitleOptions: PDFPageDrawTextOptions = { x: 50, y: netPaySectionY, size: 11, font };
  page.drawText('Net Pay', netPayTitleOptions);

  // Add net pay amount
  const netPayY = netPaySectionY - 10;
  const netPayTextOptions: PDFPageDrawTextOptions = { x: 50, y: netPayY, size: 10, font };
  page.drawText(`Net Pay: $${payroll.netPay.toFixed(2)}`, netPayTextOptions);

  // Add a signature line (optional)
  const signatureLineY = netPayY - 30;
  page.drawLine({ start: { x: 50, y: signatureLineY }, end: { x: 200, y: signatureLineY }, thickness: 0.5 });
  const signatureTextOptions: PDFPageDrawTextOptions = { x: 75, y: signatureLineY - 10, size: 10, font };
  page.drawText('Employee Signature', signatureTextOptions);

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
