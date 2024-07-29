/*
  Warnings:

  - You are about to drop the `Reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_productId_fkey";

-- DropTable
DROP TABLE "Reviews";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "productId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
