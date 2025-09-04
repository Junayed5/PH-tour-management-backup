import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalError } from "./app/modules/tour/middleware/globalErrorHandler";
import { notFound } from "./app/modules/tour/middleware/notFound";
// import httpStatus from 'http-status-codes'

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Welcome to Tour management backup",
  });
});

app.use(globalError);

app.use(notFound)
