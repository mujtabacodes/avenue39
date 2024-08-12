/*
  Warnings:

  - The `saleDuration` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "saleDuration",
ADD COLUMN     "saleDuration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
