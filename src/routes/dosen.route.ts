import { Router } from "express";
import {
  createDosen,
  deleteDosen,
  getDosen,
  updateDosen,
} from "../controllers/dosen.controller";
import { requireKoordinator, requireMahasiswa } from "../middleware/auth";

export const DosenRouter: Router = Router();

DosenRouter.get("/", requireMahasiswa, getDosen);
DosenRouter.get("/:nip", requireMahasiswa, getDosen);
DosenRouter.post("/", requireKoordinator, createDosen);
DosenRouter.put("/:nip", requireKoordinator, updateDosen);
DosenRouter.delete("/:nip", requireKoordinator, deleteDosen);
