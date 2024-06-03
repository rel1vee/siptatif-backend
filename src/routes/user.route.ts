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

UserRouter.get("/user", getUser);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", createSession);
UserRouter.post("/refresh", refreshSession);
UserRouter.put("/user/:email", requireAdmin, updateUser);
UserRouter.delete("/user/:email", requireAdmin, deleteUser);
