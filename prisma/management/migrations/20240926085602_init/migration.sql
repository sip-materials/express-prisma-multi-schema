-- CreateTable
CREATE TABLE "management"."TenantSchema" (
    "id" SERIAL NOT NULL,
    "schemaName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantSchema_schemaName_key" ON "management"."TenantSchema"("schemaName");
