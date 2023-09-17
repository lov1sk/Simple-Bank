/*
  Warnings:

  - You are about to drop the column `userId` on the `credentials` table. All the data in the column will be lost.
  - Added the required column `credentialId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_credentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL
);
INSERT INTO "new_credentials" ("id", "name", "number") SELECT "id", "name", "number" FROM "credentials";
DROP TABLE "credentials";
ALTER TABLE "new_credentials" RENAME TO "credentials";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'client',
    "password" TEXT NOT NULL,
    CONSTRAINT "users_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credentials" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("email", "id", "name", "password", "type") SELECT "email", "id", "name", "password", "type" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_credentialId_key" ON "users"("credentialId");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
