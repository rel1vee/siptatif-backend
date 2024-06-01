import { Request, Response } from "express";
import {
  createUserValidation,
  createSessionValidation,
  refreshSessionValidation,
} from "../validations/user.validation";
import { logger } from "../utils/logger";
import { checkPassword, hashing } from "../utils/hashing";
import {
  createUser,
  findUserByEmail,
  getUserByEmail,
  getUserFromDB,
} from "../services/user.service";
import { signJWT, verifyJWT } from "../utils/jwt";

export const getUser = async (req: Request, res: Response) => {
  const {
    params: { email },
  } = req;

  if (email) {
    const user = await getUserByEmail(email);
    if (user) {
      logger.info("Success get user");
      return res
        .status(200)
        .send({ status: true, statusCode: 200, data: user });
    } else {
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data Not Found" });
    }
  } else {
    const user = await getUserFromDB();
    logger.info("Success get user");
    return res.status(200).send({ status: true, statusCode: 200, data: user });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { error, value } = createUserValidation(req.body);
  if (error) {
    logger.error("Failed register user", error);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error,
    });
  }

  try {
    value.password = `${hashing(value.password)}`;

    await createUser(value);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Succes register user",
    });
  } catch (error) {
    logger.error("Failed register user", error);
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: error,
    });
  }
};

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body);
  if (error) {
    logger.error("Failed create session", error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
  }

  try {
    const user: any = await findUserByEmail(value.email);
    const isValid = checkPassword(value.password, user.password);

    if (!isValid)
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "invalid email or password",
      });

    const accessToken = signJWT({ ...user }, { expiresIn: "1d" });
    const refreshToken = signJWT({ ...user }, { expiresIn: "1y" });

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Login success",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    logger.error("Failed create session", error.message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message,
    });
  }
};

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body);
  if (error) {
    logger.error("Failed refresh session", error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken);

    const user = await findUserByEmail(decoded._doc.email);

    if (!user) return false;

    const accessToken = signJWT({ ...user }, { expiresIn: "1d" });

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Refresh session success",
      data: {
        accessToken,
      },
    });
  } catch (error: any) {
    logger.error("Failed refresh session", error.message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message,
    });
  }
};
