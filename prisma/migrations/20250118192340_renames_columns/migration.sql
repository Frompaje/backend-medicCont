/*
  Warnings:

  - You are about to drop the column `submissionDate` on the `Tax_declarations` table. All the data in the column will be lost.
  - You are about to drop the column `taxDue` on the `Tax_declarations` table. All the data in the column will be lost.
  - You are about to drop the column `totalDeductions` on the `Tax_declarations` table. All the data in the column will be lost.
  - You are about to drop the column `totalIncome` on the `Tax_declarations` table. All the data in the column will be lost.
  - Added the required column `submission_date` to the `Tax_declarations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_due` to the `Tax_declarations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_deduction` to the `Tax_declarations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_income` to the `Tax_declarations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tax_declarations" DROP COLUMN "submissionDate",
DROP COLUMN "taxDue",
DROP COLUMN "totalDeductions",
DROP COLUMN "totalIncome",
ADD COLUMN     "submission_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tax_due" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_deduction" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_income" DOUBLE PRECISION NOT NULL;
