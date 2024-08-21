/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `SubCategories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubCategories" DROP CONSTRAINT "SubCategories_categoriesId_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "color" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "SubCategories" DROP COLUMN "categoriesId";

-- CreateTable
CREATE TABLE "_CategorySubCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategorySubCategories_AB_unique" ON "_CategorySubCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_CategorySubCategories_B_index" ON "_CategorySubCategories"("B");

-- AddForeignKey
ALTER TABLE "_CategorySubCategories" ADD CONSTRAINT "_CategorySubCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySubCategories" ADD CONSTRAINT "_CategorySubCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
