// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import schemaController from "./schema.controller";
import userController from "./user.controller";
import { checkAllTenants } from "./prisma.service";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/schema', schemaController);
app.use('/user', userController);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

checkAllTenants().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
