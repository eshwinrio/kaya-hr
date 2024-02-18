-- CreateTable
CREATE TABLE `ApplicationRoleMappings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicationId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,
    `summary` VARCHAR(191) NULL,

    UNIQUE INDEX `ApplicationRoleMappings_applicationId_roleId_key`(`applicationId`, `roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApplicationRoleMappings` ADD CONSTRAINT `ApplicationRoleMappings_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Applications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationRoleMappings` ADD CONSTRAINT `ApplicationRoleMappings_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
