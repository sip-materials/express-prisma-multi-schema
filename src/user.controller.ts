import express from "express";
import { PrismaClient as CommonPrismaClient } from './generated/common-client';
import { managementPrismaClient } from "./prisma.service";

const router = express.Router();

router.get('/', (req, res) => {
  const schema = req.query['schema'];
  if (typeof schema === 'string') {
    managementPrismaClient.tenantSchema.findUnique({
      where: {
        schemaName: schema
      }
    }).then((tenantSchema) => {
      if (tenantSchema) {
        const commonClient = new CommonPrismaClient({
          datasourceUrl: process.env.DATABASE_URL_WITHOUT_SCHEMA + `?schema=${schema}`
        });
        commonClient.user.findMany().then((users) => {
          res.send(users);
        }).catch((err) => {
          res.send(err);
        });
      } else {
        res.send('Not found schema ' + schema);
      }
    }).catch((err) => {
      res.send(err);
    })
  } else {
    res.send('Schema is required');
  }
});

router.post('/', (req, res) => {
  const schema = req.query['schema'];
  if (typeof schema === 'string') {
    const { user_name, password } = req.body;
    managementPrismaClient.tenantSchema.findUnique({
      where: {
        schemaName: schema
      }
    }).then((tenantSchema) => {
      if (tenantSchema) {
        const commonClient = new CommonPrismaClient({
          datasourceUrl: process.env.DATABASE_URL_WITHOUT_SCHEMA + `?schema=${schema}`
        });
        commonClient.user.create({
          data: {
            user_name,
            password
          }
        }).then((newUser) => {
          res.send(newUser);
        }).catch((err) => {
          res.send(err);
        })
      } else {
        res.send('Not found schema ' + schema);
      }
    }).catch((err) => {
      res.send(err);
    });
  } else {
    res.send('Schema is required');
  }
});

export default router;
