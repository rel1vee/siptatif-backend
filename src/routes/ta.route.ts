import { Router } from "express";
import {
  createTA,
  deleteTA,
  getTA,
  updateTA,
} from "../controllers/ta.controller";
import { requireKoordinator, requireMahasiswa } from "../middleware/auth";

export const TARouter: Router = Router();

TARouter.get("/", requireMahasiswa,  getTA);
TARouter.get("/:nim", requireMahasiswa, getTA);
TARouter.post("/", requireMahasiswa, createTA);
TARouter.put("/:kode", requireKoordinator, updateTA);
TARouter.delete("/:kode", requireKoordinator, deleteTA);