import { ClockTime, Organization, Payroll, Payslip, User } from '@prisma/client';
import { ColorTypes, PDFDocument, PageSizes, StandardFonts, degrees, grayscale, rgb } from 'pdf-lib';
import dayjs from './dayjs.js';
import { Decimal } from '@prisma/client/runtime/library';
  
export async function generateInvoicePDF(organization: Organization, user: User, payslip: Payslip, clockTimes: Array<ClockTime>) {
  const pdfDoc = await PDFDocument.create();
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);


  const page = pdfDoc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();

  // Set margins
  const margin = 40;
  const rAlignMaxWidth = 150;
  const rAlignmentXAxisOrigin = width - margin - rAlignMaxWidth;

  // Company Info
  page.drawText(organization.name, {
    x: margin,
    y: height - margin,
    size: 14,
    font: helveticaBoldFont,
  });
  page.drawText(organization.webUrl ?? '', {
    x: margin,
    y: height - margin - 15,
    size: 10,
    font: helveticaFont,
  });

  // Employee Info
  page.drawText(`Employee ID: ${user.id}`, {
    x: rAlignmentXAxisOrigin,
    y: height - margin,
    size: 10,
    font: helveticaFont,
    maxWidth: rAlignMaxWidth,
    wordBreaks: ['break-all'],
  });
  page.drawText(user.firstName + ' ' + user.lastName, {
    x: rAlignmentXAxisOrigin,
    y: height - margin - 15,
    size: 10,
    font: helveticaFont,
    maxWidth: rAlignMaxWidth,
    wordBreaks: ['break-all'],
  });

  // Pay Period & Date
  page.drawText(payslip.periodStart.toLocaleString('en-US', { month: 'long', year: 'numeric' }), {
    x: margin,
    y: height - margin - 40,
    size: 12,
    font: helveticaBoldFont,
  });
  page.drawText(`Pay Date: ${payslip.dispensedOn?.toLocaleDateString() ?? 'Unpaid'}`, {
    x: rAlignmentXAxisOrigin,
    y: height - margin - 40,
    size: 12,
    font: helveticaBoldFont,
    maxWidth: rAlignMaxWidth,
    wordBreaks: ['break-all'],
  });

  // Income Table Headers
  const incomeTableY = height - margin - 80;
  page.drawText('Shift date', {
    x: margin,
    y: incomeTableY,
    size: 10,
    font: helveticaBoldFont,
  });
  page.drawText('Hours', {
    x: (width / 4) + 10,
    y: incomeTableY,
    size: 10,
    font: helveticaBoldFont,
  });
  page.drawText('Rate', {
    x: (width / 4) * 2 - 10,
    y: incomeTableY,
    size: 10,
    font: helveticaBoldFont,
  });
  page.drawText('Gross pay', {
    x: (width / 4) * 3 - 10,
    y: incomeTableY,
    size: 10,
    font: helveticaBoldFont,
  });

  let totalHours = 0;
  let totalGrossPay = new Decimal(0);

  // Income Table Rows
  let incomeTableYPos = incomeTableY - 15;
  for (const clocktime of clockTimes) {
    const hours = dayjs(clocktime.endTime).diff(dayjs(clocktime.startTime), 'hour');
    totalHours += hours;
    const grossPay = clocktime.hourlyWage.mul(hours);
    totalGrossPay = totalGrossPay.add(grossPay);
    page.drawText(clocktime.startTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), {
      x: margin,
      y: incomeTableYPos,
      size: 10,
      font: helveticaFont,
    });
    page.drawText(hours.toString(), {
      x: (width / 4) + 10,
      y: incomeTableYPos,
      size: 10,
      font: helveticaFont,
    });
    page.drawText(clocktime.hourlyWage.toString(), {
      x: (width / 4) * 2 - 10,
      y: incomeTableYPos,
      size: 10,
      font: helveticaFont,
    });
    page.drawText(grossPay.toDecimalPlaces(2).toString(), {
      x: (width / 4) * 3 - 10,
      y: incomeTableYPos,
      size: 10,
      font: helveticaFont,
    });
    incomeTableYPos -= 15;
  }

  // Total Hours
  page.drawText(totalHours.toString(), {
    x: (width / 4) + 10,
    y: incomeTableYPos - 10,
    size: 10,
    font: helveticaBoldFont,
  });

  // Total Gross Pay
  page.drawText(totalGrossPay.toDecimalPlaces(2).toString(), {
    x: (width / 4) * 3 - 10,
    y: incomeTableYPos - 10,
    size: 10,
    font: helveticaBoldFont,
  });

  // Deductions
  const deductions = payslip.deductions.toFixed(2);
  page.drawText('Deductions', {
    x: margin,
    y: incomeTableYPos - 30,
    size: 10,
    font: helveticaBoldFont,
  });
  page.drawText(`$${deductions}`, {
    x: (width / 4) * 3 - 10,
    y: incomeTableYPos - 30,
    size: 10,
    font: helveticaBoldFont,
  });

  // Net Income
  const netIncome = totalGrossPay.sub(payslip.deductions).toDecimalPlaces(2).toString();
  page.drawText('Current Net Income', {
    x: margin,
    y: incomeTableYPos - 50,
    size: 12,
    font: helveticaBoldFont,
  });
  page.drawText(`$${netIncome}`, {
    x: (width / 4) * 3 - 10,
    y: incomeTableYPos - 50,
    size: 12,
    font: helveticaBoldFont,
  });
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
