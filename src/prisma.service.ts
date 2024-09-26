import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';
import { PrismaClient as ManagementPrismaClient } from './generated/management-client';
// import dotenv from 'dotenv';

// dotenv.config();

const execPromise = promisify(exec);
export const managementPrismaClient = new ManagementPrismaClient();
const osType = os.platform();

/**
 * call in queue
 * @param schemaName string
 */
export const migrateCommonSchema = async (schemaName: string) => {
  if (osType === 'win32') {
    await execPromise(`set DATABASE_URL_COMMON=${process.env.DATABASE_URL_WITHOUT_SCHEMA}?schema=${schemaName} && npx prisma migrate deploy --schema=./prisma/common/schema.prisma`);
  } else {
    await execPromise(`DATABASE_URL_COMMON=${process.env.DATABASE_URL_WITHOUT_SCHEMA}?schema=${schemaName} npx prisma migrate deploy --schema=./prisma/common/schema.prisma`);
  }
}

export const checkAllTenants = async () => {
  const tenantSchemas = await managementPrismaClient.tenantSchema.findMany({});
  for (const tenantSchema of tenantSchemas) {
    await migrateCommonSchema(tenantSchema.schemaName);
  }
}

