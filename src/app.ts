import express, { Request, Response } from 'express'
import { userRoutes } from './app/modules/user/user.routes';
import cors from 'cors'

export const app = express();
app.use(express.json())
app.use('/api/v1/user', userRoutes)
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Welcome to Tour management backup",
  });
});