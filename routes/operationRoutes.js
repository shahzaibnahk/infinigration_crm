import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  getLeadsBySalesStatus,
  updateClientProfile,
} from "../controllers/leadController.js";
import {
  createContractTemplate,
  deleteContractTemplate,
  getAllContractTemplates,
  getContractTemplateById,
  getProgramContractTemplates,
  updateContractTemplate,
} from "../controllers/contractTemplateController.js";
import {
  changeClientStageStatus,
  createClient,
  deleteClient,
  getAllClients,
  getClientAsOptions,
  getClientById,
  updateClient,
} from "../controllers/clientController.js";
import { getOperationStats } from "../controllers/statsController.js";

const router = express.Router();

router.get(
  "/operation/stats",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  getOperationStats
);

router.get(
  "/get-closed-leads",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  getLeadsBySalesStatus
);

router.post(
  "/contract-template",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  createContractTemplate
);

router.get(
  "/contract-templates",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  getAllContractTemplates
);

router.get(
  "/contract-template/:id",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  getContractTemplateById
);

router.get(
  "/contract-template-by-program/:id",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  getProgramContractTemplates
);

router.put(
  "/contract-template/:id",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  updateContractTemplate
);

router.delete(
  "/contract-template/:id",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  deleteContractTemplate
);

router.post(
  "/client",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  createClient
);

router.get(
  "/clients",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  getAllClients
);

router.get(
  "/operation/client/:id",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  getClientById
);

router.get(
  "/clients-options",
  isAuthenticated,
  isAuthorized("operations", "admin", "finance"),
  getClientAsOptions
);

router.put(
  "/operations/client/:id",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  updateClient
);

router.delete(
  "/client/:id",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  deleteClient
);

router.put(
  "/client/:id/mark-stage-complete",
  isAuthenticated,
  isAuthorized("operations", "admin"),
  changeClientStageStatus
);

export default router;
