-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "color" TEXT[] DEFAULT ARRAY[]::TEXT[];
