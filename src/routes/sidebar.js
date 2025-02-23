import { RxDashboard } from "react-icons/rx";
import { LuUserRoundSearch } from "react-icons/lu";
import { LuSquareActivity } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { PiGearSix } from "react-icons/pi";
import { LuUserRoundCheck } from "react-icons/lu";
import { RiUserStarLine } from "react-icons/ri";
import { PiAirplaneTilt } from "react-icons/pi";
import { ImInsertTemplate } from "react-icons/im";
import { MdHistory } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TbCreditCardRefund } from "react-icons/tb";
import { BsGraphDownArrow } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { BsGraphUpArrow } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdOutlineAccountBalance } from "react-icons/md";

export const marketingRoutes = [
  {
    value: "/marketing/dashboard",
    title: "Dashboard",
    expandAble: false,

    icon: RxDashboard,
  },

  {
    value: "",
    title: "Leads",
    expandAble: true,
    subRoutes: [
      { value: "/marketing/leads/add", label: "Add New Lead" },
      { value: "/marketing/leads/fresh", label: "Fresh Leads" },
      { value: "/marketing/leads/returned", label: "Returned Leads" },
      { value: "/marketing/leads/shuffled", label: "Shuffled Leads" },
    ],
    icon: LuUserRoundSearch,
  },

  {
    value: "/marketing/logs",
    title: "Activity Logs",
    expandAble: false,

    icon: LuSquareActivity,
  },

  {
    value: "/marketing/salary-record",
    title: "Salary Record",
    expandAble: false,

    icon: TbMoneybag,
  },

  {
    value: "/marketing/settings",
    title: "Settings",
    expandAble: false,

    icon: PiGearSix,
  },
];

export const sSalesRoutes = [
  {
    value: "/sales/dashboard",
    title: "Dashboard",
    expandAble: false,

    icon: RxDashboard,
  },

  {
    value: "",
    title: "Leads",
    expandAble: true,
    subRoutes: [
      { value: "/sales/leads/assigned", label: "Assigned Leads" },
      { value: "/sales/leads/shuffled", label: "Shuffled Leads" },
    ],
    icon: LuUserRoundSearch,
  },

  {
    value: "/sales/logs",
    title: "Sales Logs",
    expandAble: false,

    icon: LuSquareActivity,
  },

  {
    value: "/sales/salary-record",
    title: "Salary Record",
    expandAble: false,

    icon: TbMoneybag,
  },

  {
    value: "/sales/settings",
    title: "Settings",
    expandAble: false,

    icon: PiGearSix,
  },
];

export const sOperationsRoutes = [
  {
    value: "/operations/dashboard",
    title: "Dashboard",
    expandAble: false,

    icon: RxDashboard,
  },

  {
    value: "/operations/closed-leads",
    title: "Closed Leads",
    expandAble: false,
    icon: LuUserRoundCheck,
  },

  {
    value: "/operations/clients",
    title: "Clients",
    expandAble: false,

    icon: RiUserStarLine,
  },

  {
    value: "",
    title: "Programs",
    expandAble: true,
    subRoutes: [
      { value: "/operations/programs", label: "All Programs" },
      { value: "/operations/programs/add", label: "Add New Program" },
    ],
    icon: PiAirplaneTilt,
  },

  {
    value: "",
    title: "Contract Templates",
    expandAble: true,
    subRoutes: [
      { value: "/operations/templates", label: "All Templates" },
      { value: "/operations/templates/add", label: "Add New Template" },
    ],
    icon: ImInsertTemplate,
  },
  {
    value: "/operations/salary-record",
    title: "Salary Record",
    expandAble: false,
    icon: TbMoneybag,
  },

  {
    value: "/operations/logs",
    title: "Activity Logs",
    expandAble: false,

    icon: MdHistory,
  },

  {
    value: "/operations/settings",
    title: "Settings",
    expandAble: false,

    icon: PiGearSix,
  },
];
export const sFinanceRoutes = [
  {
    value: "/finance/dashboard",
    title: "Dashboard",
    expandAble: false,
    icon: RxDashboard,
  },

  {
    value: "",
    title: "Accounts",
    expandAble: true,
    subRoutes: [
      { value: "/finance/accounts/all", label: "All Accounts" },
      { value: "/finance/accounts/add", label: "Add New Account" },
    ],
    icon: MdOutlineAccountBalance,
  },

  {
    value: "",
    title: "Invoices",
    expandAble: true,
    subRoutes: [
      { value: "/finance/invoices/all", label: "All Invoice" },
      { value: "/finance/invoices/add", label: "Add New" },
    ],
    icon: LiaFileInvoiceDollarSolid,
  },

  {
    value: "/finance/incomings",
    title: "Incomings",
    expandAble: false,

    icon: BsGraphUpArrow,
  },

  {
    value: "/finance/expenses",
    title: "Expenses",
    expandAble: true,
    subRoutes: [
      { value: "/finance/expenses/all", label: "All Expenses" },
      { value: "/finance/expenses/add", label: "Add New" },
    ],
    icon: BsGraphDownArrow,
  },

  // {
  //   value: "/finance/payments_received",
  //   title: "Payments Received",
  //   expandAble: false,
  //   icon: HiOutlineBanknotes,
  // },

  {
    value: "/finance/credit_notes",
    title: "Credit Notes",
    expandAble: true,
    subRoutes: [
      { value: "/finance/credit_notes/all", label: "All Credit Notes" },
      { value: "/finance/credit_notes/add", label: "Add New" },
    ],
    icon: TbCreditCardRefund,
  },

  {
    value: "",
    title: "Vendors",
    expandAble: true,
    subRoutes: [
      { value: "/finance/vendor/payments", label: "Vendor Payments" },
      { value: "/finance/vendor/payments/add", label: "Add Vendor Payment" },
      // { value: "/finance/vendor/credits", label: "Vendor Credits" },
      // { value: "/finance/vendor/credits", label: "Add Vendor Credit" },
    ],
    icon: LiaUsersCogSolid,
  },

  {
    value: "",
    title: "Subagents",
    expandAble: true,
    subRoutes: [
      { value: "/finance/subagent/payments", label: "Subagent Payments" },
      {
        value: "/finance/subagent/payments/add",
        label: "Add Subagent Payment",
      },
      // { value: "/finance/vendor/credits", label: "Vendor Credits" },
      // { value: "/finance/vendor/credits", label: "Add Vendor Credit" },
    ],
    icon: LiaUsersCogSolid,
  },
  {
    value: "/finance/employee_payrolls",
    title: "Employee Payrolls",
    expandAble: false,
    subRoutes: [
      { value: "/finance/vendor/payments", label: "Vendor Payments" },
      { value: "/finance/vendor/credits", label: "Vendor Credits" },
    ],
    icon: PiMoneyWavy,
  },

  {
    value: "/finance/logs",
    title: "Activity Logs",
    expandAble: false,
    icon: MdHistory,
  },

  {
    value: "/finance/salary_record",
    title: "Salary Record",
    expandAble: false,
    icon: TbMoneybag,
  },
  {
    value: "/finance/settings",
    title: "Settings",
    expandAble: false,
    icon: PiGearSix,
  },
];

export const sAdminRoutes = [
  {
    value: "/admin/dashboard",
    title: "Dashboard",
    expandAble: false,
    icon: RxDashboard,
  },

  {
    value: "",
    title: "Leads",
    expandAble: true,
    subRoutes: [
      { value: "/marketing/leads/add", label: "Add New Lead" },
      { value: "/marketing/leads/fresh", label: "Fresh Leads" },
      { value: "/marketing/leads/returned", label: "Returned Leads" },
      { value: "/marketing/leads/shuffled", label: "Shuffled Leads" },
    ],
    icon: LuUserRoundSearch,
  },

  {
    value: "/operations/closed-leads",
    title: "Closed Leads",
    expandAble: false,
    icon: LuUserRoundCheck,
  },

  {
    value: "/operations/clients",
    title: "Clients",
    expandAble: false,

    icon: RiUserStarLine,
  },

  {
    value: "",
    title: "Programs",
    expandAble: true,
    subRoutes: [
      { value: "/operations/programs", label: "All Programs" },
      { value: "/operations/programs/add", label: "Add New Program" },
    ],
    icon: PiAirplaneTilt,
  },

  {
    value: "",
    title: "Contract Templates",
    expandAble: true,
    subRoutes: [
      { value: "/operations/templates", label: "All Templates" },
      { value: "/operations/templates/add", label: "Add New Template" },
    ],
    icon: ImInsertTemplate,
  },

  {
    value: "",
    title: "Accounts",
    expandAble: true,
    subRoutes: [
      { value: "/finance/accounts/all", label: "All Accounts" },
      { value: "/finance/accounts/add", label: "Add New Account" },
    ],
    icon: MdOutlineAccountBalance,
  },
  {
    value: "",
    title: "Invoices",
    expandAble: true,
    subRoutes: [
      { value: "/finance/invoices/all", label: "All Invoice" },
      { value: "/finance/invoices/add", label: "Add New" },
    ],
    icon: LiaFileInvoiceDollarSolid,
  },

  {
    value: "/finance/incomings",
    title: "Incomings",
    expandAble: false,

    icon: BsGraphUpArrow,
  },

  {
    value: "/finance/expenses",
    title: "Expenses",
    expandAble: true,
    subRoutes: [
      { value: "/finance/expenses/all", label: "All Expenses" },
      { value: "/finance/expenses/add", label: "Add New" },
    ],
    icon: BsGraphDownArrow,
  },

  {
    value: "/finance/credit_notes",
    title: "Credit Notes",
    expandAble: true,
    subRoutes: [
      { value: "/finance/credit_notes/all", label: "All Credit Notes" },
      { value: "/finance/credit_notes/add", label: "Add New" },
    ],
    icon: TbCreditCardRefund,
  },

  {
    value: "",
    title: "Vendors",
    expandAble: true,
    subRoutes: [
      { value: "/admin/vendors/all", label: "All Vendors" },
      { value: "/admin/vendors/add", label: "Add New Vendor" },
      { value: "/finance/vendor/payments", label: "Vendor Payments" },
      { value: "/finance/vendor/payments/add", label: "Add Vendor Payment" },
      // { value: "/finance/vendor/credits", label: "Vendor Credits" },
      // { value: "/finance/vendor/credits", label: "Add Vendor Credit" },
    ],
    icon: LiaUsersCogSolid,
  },

  {
    value: "",
    title: "Subagents",
    expandAble: true,
    subRoutes: [
      { value: "/finance/subagent/payments", label: "Subagent Payments" },
      {
        value: "/finance/subagent/payments/add",
        label: "Add Subagent Payment",
      },
      // { value: "/finance/vendor/credits", label: "Vendor Credits" },
      // { value: "/finance/vendor/credits", label: "Add Vendor Credit" },
    ],
    icon: LiaUsersCogSolid,
  },

  {
    value: "/finance/employee_payrolls",
    title: "Employee Payrolls",
    expandAble: false,
    subRoutes: [
      { value: "/finance/vendor/payments", label: "Vendor Payments" },
      { value: "/finance/vendor/credits", label: "Vendor Credits" },
    ],
    icon: PiMoneyWavy,
  },
];
