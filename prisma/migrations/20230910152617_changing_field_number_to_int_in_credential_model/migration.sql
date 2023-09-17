/*
  Warnings:

  - You are about to alter the column `number` on the `credentials` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_credentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL
);
INSERT INTO "new_credentials" ("id", "name", "number") SELECT "id", "name", "number" FROM "credentials";
DROP TABLE "credentials";
ALTER TABLE "new_credentials" RENAME TO "credentials";
CREATE UNIQUE INDEX "credentials_number_key" ON "credentials"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
