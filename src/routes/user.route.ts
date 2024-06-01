import { Router } from "express";
import {
  registerUser,
  createSession,
  refreshSession,
  getUser
} from "../controllers/user.controller";

export const UserRouter: Router = Router();

UserRouter.get("/user", getUser);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", createSession);
UserRouter.post("/refresh", refreshSession);
