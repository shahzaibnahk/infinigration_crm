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
  isAuthorized("admin", "operations"),
  createProgram
);

router.get(
  "/programs",
  isAuthenticated,
  isAuthorized("admin", "operations", "sales"),
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
  isAuthorized("admin", "operations"),
  getProgramById
);

router.put(
  "/program/:id",
  isAuthenticated,
  isAuthorized("admin", "operations"),
  updateProgram
);

router.put(
  "/program/:id/change-status",
  isAuthenticated,
  isAuthorized("admin", "operations"),
  changeProgramStatus
);

router.delete(
  "/program/:id",
  isAuthenticated,
  isAuthorized("admin", "operations"),
  deleteProgram
);

export default router;
