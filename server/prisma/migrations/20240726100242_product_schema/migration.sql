/*
  Warnings:

  - You are about to drop the column `productId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "productId",
ADD COLUMN     "productsId" INTEGER;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "productCode" TEXT NOT NULL,
    "posterImageUrl" TEXT NOT NULL,
    "posterImagePublicId" TEXT NOT NULL,
    "hoverImageUrl" TEXT NOT NULL,
    "hoverImagePublicId" TEXT NOT NULL,
    "productImages" JSONB[],
    "additionalInformation" JSONB[],
    "categorysId" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorys" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posterImageUrl" TEXT NOT NULL,
    "posterImagePublicId" TEXT NOT NULL,

    CONSTRAINT "Categorys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_productCode_key" ON "Products"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "Categorys_name_key" ON "Categorys"("name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categorysId_fkey" FOREIGN KEY ("categorysId") REFERENCES "Categorys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
