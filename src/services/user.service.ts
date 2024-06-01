import UserType from "../types/user.type";
import userModel from "../models/user.model";
import { logger } from "../utils/logger";

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