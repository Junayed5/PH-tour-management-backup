import AppError from "../../erroHelpers/AppError";
import {  IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import createUserToken, { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
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
  const newAccessToken = await createNewAccessTokenWithRefreshToken(token)
  return {
    accessToken: newAccessToken
  };
};
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

  const user = await User.findById(decodedToken.userId)
  const matchPassword = await bcryptjs.compare(oldPassword, user?.password as string);

  if (!matchPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password didn't match")
  }

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }
  user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUNDS));
  await user.save();

};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword
};
