import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;

  const user = await User.create({
    name,
    email,
  });

  return user;
};

const getUsers = async () => {
  const users = await User.find({})

  return users
}

export const userServices = {
  createUser,
  getUsers
};
