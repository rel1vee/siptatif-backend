import Joi from "joi";
import UserType from "../types/user.type";

export const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    nama: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};

export const createSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};

export const refreshSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
  });

  return schema.validate(payload);
};