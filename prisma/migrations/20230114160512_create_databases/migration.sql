-- CreateTable
CREATE TABLE "Database" (
    "id" TEXT NOT NULL DEFAULT nanoid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT nanoid(),
    "password" TEXT NOT NULL DEFAULT nanoid(),

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Database_name_key" ON "Database"("name");
