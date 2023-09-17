-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'client',
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "transfers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    CONSTRAINT "transfers_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transfers_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
