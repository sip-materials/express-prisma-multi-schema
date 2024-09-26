import express from "express";
import { PrismaClient as ManagementPrismaClient } from './generated/management-client';
import { migrateCommonSchema } from "./prisma.service";


const router = express.Router();

router.get('/', (req, res) => {
  const manageClient = new ManagementPrismaClient({
    datasourceUrl: process.env.DATABASE_URL_FOR_MANAGEMENT
  });
  manageClient.tenantSchema.findMany().then((schemas) => {
    res.send(schemas);
  }).catch((err) => {
    res.send(err);
  })
});

router.post('/', (req, res) => {
  const { schema } = req.body;
  console.log("", schema)
  const manageClient = new ManagementPrismaClient({
    datasourceUrl: process.env.DATABASE_URL_FOR_MANAGEMENT
  });
  manageClient.tenantSchema.create({
    data: {
      schemaName: schema
    }
  }).then(({ schemaName }) => {
    migrateCommonSchema(schemaName).then(() => {
      res.send('Success')
    }).catch((err) => {
      res.send(err)
    });
  }).catch((err) => {
    res.send(err);
  })
});

export default router;
