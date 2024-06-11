import { logger } from "../utils/logger";
import UserType from "../types/user.type";
import userModel from "../models/user.model";

export const getUserFromDB = async () => {
  return await userModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      logger.info("Cannot get data from DB");
      logger.error(error);
    });
};

export const getUserByEmail = async (email: String) => {
  return await userModel.findOne({ email: email });
};

export const createUser = async (payload: UserType) => {
  return await userModel.create(payload);
};

export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email });
};

export const updateUserByEmail = async (email: String, payload: UserType) => {
  const result = await userModel.findOneAndUpdate(
    {
      email: email,
    },
    { $set: payload }
  );
  return result;
};

export const deleteUserByEmail = async (email: String) => {
  const result = await userModel.findOneAndDelete({
    email: email,
  });
  return result;
};
