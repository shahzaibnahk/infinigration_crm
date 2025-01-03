import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLeadById,
  updateLead,
} from "../controllers/leadController.js";
import { getMarketingStats } from "../controllers/statsController.js";

const router = express.Router();

router.post(
  "/create-lead",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  createLead
);

router.get(
  "/leads",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  getAllLeads
);

router.get(
  "/lead/:id",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  getLeadById
);

router.put(
  "/lead/:id",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  updateLead
);

router.delete(
  "/lead/:id",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  deleteLead
);

router.get(
  "/marketing/stats",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  getMarketingStats
);

export default router;
