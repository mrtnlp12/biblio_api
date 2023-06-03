/*
  Warnings:

  - You are about to drop the `_BooksToLoans` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `Loans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_BooksToLoans` DROP FOREIGN KEY `_BooksToLoans_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BooksToLoans` DROP FOREIGN KEY `_BooksToLoans_B_fkey`;

-- AlterTable
ALTER TABLE `Loans` ADD COLUMN `bookId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_BooksToLoans`;

-- AddForeignKey
ALTER TABLE `Loans` ADD CONSTRAINT `Loans_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
