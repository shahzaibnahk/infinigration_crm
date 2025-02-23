import SalaryRecord from "../pages/common/SalaryRecord";
import Settings from "../pages/common/Settings";
import Accounts from "../pages/finance/account/Accounts";
import AddNewAccount from "../pages/finance/account/AddNewAccount";
import AddOwnerCapital from "../pages/finance/account/AddOwnerCapital";
import UpdateAccount from "../pages/finance/account/UpdateAccount";
import ViewAccount from "../pages/finance/account/ViewAccount";
import ViewInvoice from "../pages/finance/account/ViewInvoice";
import CreditNotes from "../pages/finance/CreditNotes";
import EmployeePayrolls from "../pages/finance/EmployeePayrolls";
import AddNewExpense from "../pages/finance/expense/AddNewExpense";
import Expenses from "../pages/finance/expense/Expenses";
import FinanceDashboard from "../pages/finance/FinanceDashboard";
import Incomings from "../pages/finance/Incomings";
import AddNewInvoice from "../pages/finance/invoice/AddNewInvoice";
import Invoices from "../pages/finance/invoice/Invoices";
import MarkInvoicePaid from "../pages/finance/invoice/MarkInvoicePaid";
import UpdateInvoice from "../pages/finance/invoice/UpdateInvoice";
import PaymentsReceived from "../pages/finance/PaymentsReceived";
import AddSubagentPayment from "../pages/finance/subagent/AddSubagentPayment";
import AddVendorPayments from "../pages/finance/vendor/AddVendorPayments";
import VendorCredits from "../pages/finance/vendor/VendorCredits";
import VendorPayments from "../pages/finance/vendor/VendorPayments";
import ActivityLogs from "../pages/marketing/ActivityLogs";

export const financeRoutes = [
  {
    path: "/finance/dashboard",
    title: "Finance Dashboard",
    element: FinanceDashboard,
  },

  {
    path: "/finance/accounts/all",
    title: "Accounts",
    element: Accounts,
  },

  {
    path: "/finance/accounts/add",
    title: "Add New Account",
    element: AddNewAccount,
  },

  {
    path: "/finance/account/:id",
    title: "View Account",
    element: ViewAccount,
  },

  {
    path: "/finance/account/:id/add-owner-capital",
    title: "Add Owner Capital",
    element: AddOwnerCapital,
  },

  {
    path: "/finance/account/:id/update",
    title: "Update Account",
    element: UpdateAccount,
  },
  {
    path: "/finance/invoices/all",
    title: "Invoices",
    element: Invoices,
  },

  {
    path: "/finance/invoices/add",
    title: "Add New Invoice",
    element: AddNewInvoice,
  },

  {
    path: "/finance/invoice/:id",
    title: "View Invoice",
    element: ViewInvoice,
  },

  {
    path: "/finance/invoice/:id/mark-paid",
    title: "Mark Invoice Paid",
    element: MarkInvoicePaid,
  },

  {
    path: "/finance/invoice/:id/update",
    title: "Update Invoice",
    element: UpdateInvoice,
  },

  {
    path: "/finance/incomings",
    title: "Incomings",
    element: Incomings,
  },
  {
    path: "/finance/expenses/all",
    title: "Expenses",
    element: Expenses,
  },

  {
    path: "/finance/expenses/add",
    title: "Add New Expense",
    element: AddNewExpense,
  },

  {
    path: "/finance/payments_received",
    title: "Payments Received",
    element: PaymentsReceived,
  },

  {
    path: "/finance/credit_notes",
    title: "Credit Notes",
    element: CreditNotes,
  },

  {
    path: "/finance/vendor/payments",
    title: "Vendor Payments",
    element: VendorPayments,
  },

  {
    path: "/finance/vendor/payments/add",
    title: "Add Vendor Payment",
    element: AddVendorPayments,
  },

  {
    path: "/finance/subagent/payments",
    title: "Subagent Payments",
    element: VendorPayments,
  },

  {
    path: "/finance/subagent/payments/add",
    title: "Add Subagent Payment",
    element: AddSubagentPayment,
  },

  {
    path: "/finance/vendor/credits",
    title: "Vendor Credits",
    element: VendorCredits,
  },

  {
    path: "/finance/employee_payrolls",
    title: "Employee Payrolls",
    element: EmployeePayrolls,
  },

  {
    path: "/finance/employee_payrolls/:id",
    title: "View Payroll Details",
    element: SalaryRecord,
  },

  {
    path: "/finance/settings",
    title: "Finance Dashboard",
    element: Settings,
  },

  {
    path: "/finance/logs",
    title: "Activity Logs",
    element: ActivityLogs,
  },

  {
    path: "/finance/salary_record",
    title: "Salary Record",
    element: SalaryRecord,
  },
];
