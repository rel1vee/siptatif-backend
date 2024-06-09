import { Router } from "express";
import {
  createTA,
  deleteTA,
  getTA,
  updateTA,
} from "../controllers/ta.controller";
import { requireKoordinator, requireMahasiswa } from "../middleware/auth";

export const TARouter: Router = Router();

TARouter.get("/",  getTA);
TARouter.get("/:nim", getTA);
TARouter.post("/", createTA);
TARouter.put("/:kode", requireKoordinator, updateTA);
TARouter.delete("/:kode", requireKoordinator, deleteTA);