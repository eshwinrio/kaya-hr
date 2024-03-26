/*
  Warnings:

  - You are about to drop the column `hourlyWage` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `Payroll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ClockTime` ADD COLUMN `paymentStatus` ENUM('CANCELED', 'PENDING', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `payrollId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Payroll` DROP COLUMN `hourlyWage`,
    DROP COLUMN `hours`;

-- AddForeignKey
ALTER TABLE `ClockTime` ADD CONSTRAINT `ClockTime_payrollId_fkey` FOREIGN KEY (`payrollId`) REFERENCES `Payroll`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
