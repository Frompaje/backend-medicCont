/*
  Warnings:

  - You are about to drop the `Tax_declarations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tax_declarations" DROP CONSTRAINT "Tax_declarations_userId_fkey";

-- DropTable
DROP TABLE "Tax_declarations";

-- CreateTable
CREATE TABLE "tax_declarations" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "total_income" DOUBLE PRECISION NOT NULL,
    "total_deduction" DOUBLE PRECISION NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "total_tax" DOUBLE PRECISION NOT NULL,
    " monthly_tax" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tax_declarations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tax_declarations" ADD CONSTRAINT "tax_declarations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
