import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  assignLeads,
  bulkUploadLead,
  createLead,
  deleteLead,
  getAllLeads,
  getLeadById,
  updateLead,
} from "../controllers/leadController.js";
import { getMarketingStats } from "../controllers/statsController.js";
import { getDepartment } from "../controllers/departmentsController.js";

const router = express.Router();

router.post(
  "/create-lead",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  createLead
);

router.post(
  "/bulk-upload-leads",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  bulkUploadLead
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

router.get(
  "/department/:id",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  getDepartment
);

router.put(
  "/assign-leads",
  isAuthenticated,
  isAuthorized("marketing", "admin"),
  assignLeads
);

export default router;
