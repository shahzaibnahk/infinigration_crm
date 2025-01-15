import SalaryRecord from "../pages/common/SalaryRecord";
import Settings from "../pages/common/Settings";
import ActivityLogs from "../pages/marketing/ActivityLogs";
import Leads from "../pages/sales/leads/Leads";
import SalesDashboard from "../pages/sales/SalesDashboard";

export const salesRoutes = [
  {
    path: "/sales/dashboard",
    title: "Sales Dashboard",
    element: SalesDashboard,
  },

  {
    path: "/sales/leads/assigned",
    title: "Assigned Leads",
    element: Leads,
  },

  {
    path: "/sales/leads/shuffled",
    title: "Shuffled Leads",
    element: Leads,
  },

  {
    path: "/sales/logs",
    title: "Activity Logs",
    element: ActivityLogs,
  },

  {
    path: "/sales/salary-record",
    title: "Salary Record",
    element: SalaryRecord,
  },

  {
    path: "/sales/settings",
    title: "Settings",
    element: Settings,
  },
];
