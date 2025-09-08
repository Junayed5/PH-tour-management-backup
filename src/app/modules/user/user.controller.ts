import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/senResponse";
import { JwtPayload } from "jsonwebtoken";

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
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created successfully",
      data: user,
    });

    // res.status(httpStatus.CREATED).json({
    //   success: true,
    //   message: "User Created successfully",
    //   user,
    // });
  }
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getUsers();

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users retrived successfully",
      data: result.data,
      meta: result.meta
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  // from global interface
  const verifiedToken = req.user
  // const token = req.headers.authorization;
  // const verifiedToken =  verifyToken(token as string, envVars.JWT_SECRET) as JwtPayload
  const payload = req.body;

  const user = await userServices.updateUser(userId, payload, verifiedToken as JwtPayload);

  sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Updated successfully",
      data: user,
    });
})

export const userController = {
  createUser,
  getAllUsers,
  updateUser
};
