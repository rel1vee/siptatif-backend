import { Router } from "express";
import {
  createDosen,
  deleteDosen,
  getDosen,
  updateDosen,
} from "../controllers/dosen.controller";
import { requireKoordinator, requireMahasiswa } from "../middleware/auth";

export const DosenRouter: Router = Router();

DosenRouter.get("/", getDosen);
DosenRouter.get("/:nip", getDosen);
DosenRouter.post("/", requireKoordinator, createDosen);
DosenRouter.put("/:nip", requireKoordinator, updateDosen);
DosenRouter.delete("/:nip", requireKoordinator, deleteDosen);
