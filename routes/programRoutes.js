import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  changeProgramStatus,
  createProgram,
  deleteProgram,
  getAllProgramAsOptions,
  getAllPrograms,
  getProgramById,
  updateProgram,
} from "../controllers/programController.js";

const router = express.Router();

router.post(
  "/program",
  isAuthenticated,
  isAuthorized("admin", "operation"),
  createProgram
);

router.get(
  "/programs",
  isAuthenticated,
  isAuthorized("admin", "operation", "sales"),
  getAllPrograms
);

router.get(
  "/program-options",
  isAuthenticated,
  isAuthorized("admin", "operation", "sales"),
  getAllProgramAsOptions
);

router.get(
  "/program/:id",
  isAuthenticated,
  isAuthorized("admin", "operation"),
  getProgramById
);

router.put(
  "/program/:id",
  isAuthenticated,
  isAuthorized("admin", "operation"),
  updateProgram
);

router.put(
  "/program/:id/change-status",
  isAuthenticated,
  isAuthorized("admin", "operation"),
  changeProgramStatus
);

router.delete(
  "/program/:id",
  isAuthenticated,
  isAuthorized("admin", "operation"),
  deleteProgram
);

export default router;
