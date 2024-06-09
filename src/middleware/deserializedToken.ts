import { verifyJWT } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

const deserializedToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accesToken = req.headers.authorization?.split(" ")[1];
  if (!accesToken) {
    return next();
  }

  const { decoded, expired } = verifyJWT(accesToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired) {
    return next();
  }

  return next();
};

export default deserializedToken;
