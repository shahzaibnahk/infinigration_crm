import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  addBalance,
  addExpense,
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccounts,
  getTransactionsByCategory,
  getTransactionsByType,
  updateAccount,
} from "../controllers/accountController.js";
import singleUpload from "../middlewares/multer.js";
import { addVendorPayment } from "../controllers/vendorController.js";
import {
  getAllPayrolls,
  getPayrollByEmployee,
  markPayrollAsPaid,
} from "../controllers/payrollController.js";
import { getFinanceStats } from "../controllers/statsController.js";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInstallmentsByClient,
  getInvoiceById,
  markInvoicePaid,
  updateInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.get(
  "/accounts",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getAllAccounts
);

router.get(
  "/finance/stats",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getFinanceStats
);

router.get(
  "/account/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getAccountById
);

router.post(
  "/account",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  createAccount
);

router.put(
  "/account/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  updateAccount
);

router.put(
  "/account/:id/add-balance",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  singleUpload,
  addBalance
);

router.put(
  "/add-expense",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  singleUpload,
  addExpense
);

router.delete(
  "/account/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  deleteAccount
);

router.get(
  "/transaction-by-type",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getTransactionsByType
);

router.get(
  "/transaction-by-category",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getTransactionsByCategory
);

router.get(
  "/client/:id/installments",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getInstallmentsByClient
);

router.post(
  "/invoice",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  createInvoice
);

router.get(
  "/invoices",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getAllInvoices
);

router.get(
  "/invoice/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getInvoiceById
);

router.put(
  "/invoice/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  updateInvoice
);

router.delete(
  "/invoice/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  deleteInvoice
);

router.put(
  "/invoice/:id/mark-paid",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  singleUpload,
  markInvoicePaid
);

router.put(
  "/vendor/payment",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  singleUpload,
  addVendorPayment
);

router.get(
  "/payrolls",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  getAllPayrolls
);

router.get("/payroll/:id", isAuthenticated, getPayrollByEmployee);

router.put(
  "/payroll/:id",
  isAuthenticated,
  isAuthorized("admin", "finance"),
  markPayrollAsPaid
);

export default router;
