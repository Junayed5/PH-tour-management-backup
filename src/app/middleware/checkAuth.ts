import { NextFunction, Request, Response } from "express";
import { Role } from "../modules/user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import AppError from "../erroHelpers/AppError";

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
    if (!authRole.includes(verifiedToken.role)) {
      throw new AppError(403, "You are not accessible to heat this route")
    }

    next()

  } catch (error) {
    next(error)
  }
}