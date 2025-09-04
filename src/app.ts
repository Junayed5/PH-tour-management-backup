import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalError } from "./middleware/globalErrorHandler";
// import httpStatus from 'http-status-codes'
import { notFound } from "./middleware/notFound";

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
