/*
  Warnings:

  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'client',
    "password" TEXT NOT NULL
);
INSERT INTO "new_users" ("email", "id", "name", "password", "type") SELECT "email", "id", "name", "password", "type" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_key" ON "credentials"("userId");
