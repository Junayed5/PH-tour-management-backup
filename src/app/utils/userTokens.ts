import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../erroHelpers/AppError";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from 'http-status-codes'

const createUserToken = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
    
      const accessToken = generateToken(jwtPayload, envVars.JWT_SECRET, envVars.JWT_ACCESS_EXPIRY);
    
      const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRY)

      return {
        accessToken,
        refreshToken
      }
}

export const createNewAccessTokenWithRefreshToken = async(refreshToken: string) => {
  const verifyRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifyRefreshToken.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isDeleted === IsActive.INACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, `User ${isUserExist.isActive}`);
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }
  const jwtPayload = {
    userId : isUserExist._id,
    email : isUserExist.email,
    role : isUserExist.role
  }

  const accessToken = generateToken(jwtPayload, envVars.JWT_SECRET, envVars.JWT_REFRESH_EXPIRY)
  return accessToken;
}

export default createUserToken;