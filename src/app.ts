import express, { Request, Response } from 'express'

export const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Welcome to Tour management backup",
  });
});