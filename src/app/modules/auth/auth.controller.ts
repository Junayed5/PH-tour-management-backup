import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/senResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import { setCookies } from "../../utils/setCookies";
import createUserToken from "../../utils/userTokens";
import AppError from "../../erroHelpers/AppError";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // const result = await userServices.getUsers();
    const loginInfo = await AuthServices.credentialsLogin(req.body);

    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });

    // res.cookie("accessToken", loginInfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // })
    setCookies(res, loginInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in successfully",
      data: loginInfo,
    });
  }
);
const getNewAccessToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // const result = await userServices.getUsers();
    const token = req.cookies.refreshToken;
    const tokenInfo = await AuthServices.getNewAccessToken(token as string);

    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: false,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Get new token successfully",
      data: tokenInfo,
    });
  }
);
const resetPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password changed successfully",
      data: null,
    });
  }
);
const googleController = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {

    let redirect = req.query.state ? req.query.state as string : "";

    if (redirect.startsWith("/")) {
      redirect = redirect.slice(1)
    }

    const user = req.user;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    const tokenInfo =  createUserToken(user); 

    setCookies(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirect}`);
  }
);
const logout = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: false,
    })
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: false,
    })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged out successfully",
      data: null,
    });
  }
);

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleController
};
