import AppError from "../../erroHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes'
import bcryptjs from 'bcryptjs'

const createUser = async (payload: Partial<IUser>) => {
  const { email,password, ...rest } = payload;

  const isUserExist = await User.findOne({email});
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exist")
  };

  const hashedPassword = await bcryptjs.hash(password as string, 10);

  const authProvider: IAuthProvider = {provider: "credential", proverId: email as string}



  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider], 
    ...rest
  });

  return user;
};

const getUsers = async () => {
  const users = await User.find({});

  const totalUsers = await User.countDocuments()

  return {
    data: users,
    meta: {
      total : totalUsers
    }
  }
}

export const userServices = {
  createUser,
  getUsers
};
