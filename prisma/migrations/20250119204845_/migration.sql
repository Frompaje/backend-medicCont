/*
  Warnings:

  - You are about to drop the column ` monthly_tax` on the `tax_declarations` table. All the data in the column will be lost.
  - You are about to drop the column `total_deduction` on the `tax_declarations` table. All the data in the column will be lost.
  - You are about to drop the column `total_income` on the `tax_declarations` table. All the data in the column will be lost.
  - Added the required column `monthly_tax` to the `tax_declarations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_base` to the `tax_declarations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Unsubmitted', 'Submitted');

-- AlterTable
ALTER TABLE "tax_declarations" DROP COLUMN " monthly_tax",
DROP COLUMN "total_deduction",
DROP COLUMN "total_income",
ADD COLUMN     "monthly_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Unsubmitted',
ADD COLUMN     "tax_base" DOUBLE PRECISION NOT NULL;
