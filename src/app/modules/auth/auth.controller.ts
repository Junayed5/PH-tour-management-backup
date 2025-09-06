import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/senResponse";
import httpStatus from 'http-status-codes'
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // const result = await userServices.getUsers();
    const loginInfo = await AuthServices.credentialsLogin(req.body)

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in successfully",
      data: loginInfo
    });
  }
);
const getNewAccessToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // const result = await userServices.getUsers();
    const token = req.headers.authorization;
    const tokenInfo = await AuthServices.getNewAccessToken(token as string)

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in successfully",
      data: tokenInfo
    });
  }
);

export const AuthController = {
    credentialsLogin,
    getNewAccessToken
}