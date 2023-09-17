/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "credentials_number_key" ON "credentials"("number");
