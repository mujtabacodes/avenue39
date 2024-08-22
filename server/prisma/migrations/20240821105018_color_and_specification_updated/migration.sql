/*
  Warnings:

  - The `colors` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `spacification` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "colors",
ADD COLUMN     "colors" JSONB[] DEFAULT ARRAY[]::JSONB[],
DROP COLUMN "spacification",
ADD COLUMN     "spacification" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "sales_record_products" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
