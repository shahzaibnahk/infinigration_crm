import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  addVendorPayment,
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
} from "../controllers/vendorController.js";
import {
  addSubagentPayments,
  createSubagent,
  deleteSubagent,
  getAllSubagents,
  getSubagentById,
  updateSubagent,
} from "../controllers/subAgentController.js";

const router = express.Router();

router.post("/vendor", isAuthenticated, isAuthorized("admin"), createVendor);
router.get(
  "/vendors",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getAllVendors
);
router.get(
  "/vendor/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getVendorById
);
router.put(
  "/vendor/payment",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  addVendorPayment
);

router.put("/vendor/:id", isAuthenticated, isAuthorized("admin"), updateVendor);

router.delete(
  "/vendor/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteVendor
);

router.post(
  "/subagent",
  isAuthenticated,
  isAuthorized("admin"),
  createSubagent
);

router.get(
  "/subagents",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getAllSubagents
);

router.get(
  "/subagent/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getSubagentById
);

router.put(
  "/subagent/payment",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  addSubagentPayments
);

router.put(
  "/subagent/:id",
  isAuthenticated,
  isAuthorized("admin"),
  updateSubagent
);

router.delete(
  "/subagent/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteSubagent
);
export default router;
