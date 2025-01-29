import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  changeLeadStatusBySales,
  getClientProfile,
  getSalesAssignedLeads,
  returnLeads,
  submitClientDocuments,
  updateClientProfile,
} from "../controllers/leadController.js";
import singleUpload from "../middlewares/multer.js";
import {
  createRemark,
  getProfileRemarks,
} from "../controllers/remarksController.js";
import { getSalesStats } from "../controllers/statsController.js";
import { getAllProgramAsOptions } from "../controllers/programController.js";

const router = express.Router();

router.get(
  "/sales/:id/assigned-leads",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  getSalesAssignedLeads
);

router.put(
  "/client/:id",
  isAuthenticated,
  isAuthorized("sales", "operations", "admin"),
  updateClientProfile
);

router.get(
  "/client/:id",
  isAuthenticated,
  isAuthorized("sales", "operations", "admin"),
  getClientProfile
);

router.put(
  "/client/:profile/document/:id",
  isAuthenticated,
  isAuthorized("sales", "operations", "admin"),
  singleUpload,
  submitClientDocuments
);

router.post(
  "/client/remarks/add",
  isAuthenticated,
  isAuthorized("sales", "operations", "admin"),
  createRemark
);

router.get(
  "/client/:id/remarks",
  isAuthenticated,
  isAuthorized("sales", "operations", "admin"),
  getProfileRemarks
);

router.get(
  "/sales/stats",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  getSalesStats
);

router.get(
  "/program-options",
  isAuthenticated,
  isAuthorized("sales", "operations", "admin"),
  getAllProgramAsOptions
);

router.put(
  "/sales/return-leads",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  returnLeads
);

router.put(
  "/sales/lead/:id/update-status",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  changeLeadStatusBySales
);
export default router;
