/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import { IsActive, Role } from "../modules/user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import AppError from "../erroHelpers/AppError";
import { User } from "../modules/user/user.model";
import httpStatus from 'http-status-codes'

export const checkAuth = (... authRole : Role[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization;

    const verifiedToken = verifyToken(accessToken as string, envVars.JWT_SECRET) as JwtPayload;

    // if (!verifiedToken) {
    //   throw new AppError(403, "You are not authorize")
    // }
    // console.log(verifiedToken)

    // if ((verifiedToken as JwtPayload).role !== Role.ADMIN) {
    //   throw new AppError(403, "You are not accessible to heat this route")
    // }

    // console.log(verifiedToken) 

    const isUserExist = await User.findOne({ email: verifiedToken.email });

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isDeleted === IsActive.INACTIVE) {
      throw new AppError(httpStatus.BAD_REQUEST, `User ${isUserExist.isActive}`);
    }
    if (isUserExist.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
    }

    if (!authRole.includes(verifiedToken.role)) {
      throw new AppError(403, "You are not accessible to heat this route")
    }
    req.user = verifiedToken;
    next()

  } catch (error) {
    console.log("jwt err", error)
    next(error)
  }
}