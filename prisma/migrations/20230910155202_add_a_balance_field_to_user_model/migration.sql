-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'client',
    "password" TEXT NOT NULL,
    CONSTRAINT "users_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credentials" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("credentialId", "email", "id", "name", "password", "type") SELECT "credentialId", "email", "id", "name", "password", "type" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_credentialId_key" ON "users"("credentialId");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
