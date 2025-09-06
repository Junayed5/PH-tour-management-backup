import AppError from "../../erroHelpers/AppError";
import { IsActive, IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import createUserToken from "../../utils/userTokens";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does Not Exist");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
  }

  const userToken = createUserToken(isUserExist);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist.toObject();
  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};
const getNewAccessToken = async (token: string) => {
  const verifyRefreshToken = verifyToken(
    token,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

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

  // const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)

  // if (!isPasswordMatch) {
  //       throw new AppError(httpStatus.BAD_REQUEST, "incorrect password  ")
  // }

  const jwtPayload = {
    userId : isUserExist._id,
    email : isUserExist.email,
    role : isUserExist.role
  }

  const accessToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRY)
  return {
    accessToken
  };
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
};
