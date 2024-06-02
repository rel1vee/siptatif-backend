import { Router } from "express";
import {
  registerUser,
  createSession,
  refreshSession,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller";
import { requireAdmin } from "../middleware/auth";

export const UserRouter: Router = Router();

UserRouter.get("/user", requireAdmin, getUser);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", createSession);
UserRouter.post("/refresh", refreshSession);
UserRouter.post("/user/:email", requireAdmin, updateUser);
UserRouter.post("/user/:email", requireAdmin, deleteUser);
