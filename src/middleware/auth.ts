import { Request, Response, NextFunction } from "express";

export const requireMahasiswa = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export const requireKoordinator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user || user._doc.role !== "koordinator") {
    return res.sendStatus(403);
  }

  return next();
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user || user._doc.role !== "admin") {
    return res.sendStatus(403);
  }

  return next();
};
