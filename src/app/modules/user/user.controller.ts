import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

// const creteUserFunction = async(req:Request, res:Response) => {
//   const user = await userServices.createUser(req.body);

//   res.status(httpStatus.CREATED).json({
//     message: "User Created successfully",
//     user,
//   });
// };

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     creteUserFunction(req,res)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     // eslint-disable-next-line no-console
//     console.log(err);
//     next(err);
//   }
// };

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await userServices.getUsers();

//     // return users
//     res.status(httpStatus.OK).json({
//       message: "User Created successfully",
//       users,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     // eslint-disable-next-line no-console
//     console.log(err);
//     next(err);
//   }
// };

const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User Created successfully",
      user,
    });
  }
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.getUsers();

    res.status(httpStatus.OK).json({
      success: true,
      message: "All Users Retrived  successfully",
      user,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers,
};
