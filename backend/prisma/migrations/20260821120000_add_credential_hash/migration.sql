-- AlterTable
ALTER TABLE `transcript_verifications` ADD COLUMN `credentialNftTxHash` VARCHAR(191) NULL,
    ADD COLUMN `credentialHash` VARCHAR(191) NULL;
