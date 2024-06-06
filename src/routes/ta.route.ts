import multer from "multer";
import { Router } from "express";
import {
  createTA,
  deleteTA,
  getTA,
  updateTA,
} from "../controllers/ta.controller";
import { requireKoordinator, requireMahasiswa } from "../middleware/auth";

const upload = multer({ storage: multer.memoryStorage() }); // Menggunakan penyimpanan sementara di memori

export const TARouter: Router = Router();

TARouter.get("/",  getTA);
TARouter.get("/:nim", getTA);
TARouter.post("/", upload.array('file'), createTA);
TARouter.put("/:kode", requireKoordinator, updateTA);
TARouter.delete("/:kode", requireKoordinator, deleteTA);
