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
  isAuthorized("sales", "admin"),
  updateClientProfile
);

router.get(
  "/client/:id",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  getClientProfile
);

router.put(
  "/client/:profile/document/:id",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  singleUpload,
  submitClientDocuments
);

router.post(
  "/client/remarks/add",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  createRemark
);

router.get(
  "/client/:id/remarks",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  getProfileRemarks
);

router.get(
  "/sales/stats",
  isAuthenticated,
  isAuthorized("sales", "admin"),
  getSalesStats
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
