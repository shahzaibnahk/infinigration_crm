import SalaryRecord from "../pages/common/SalaryRecord";
import Settings from "../pages/common/Settings";
import ActivityLogs from "../pages/marketing/ActivityLogs";
import AddNewLead from "../pages/marketing/leads/AddNewLead";
import Leads from "../pages/marketing/leads/Leads";
import MarketingDashboard from "../pages/marketing/MarketingDashboard";

export const routes = [
  {
    path: "/marketing/dashboard",
    title: "Marketing Dashboard",
    element: MarketingDashboard,
  },
  {
    path: "/marketing/leads/add",
    title: "Add New Lead",
    element: AddNewLead,
  },

  {
    path: "/marketing/leads/:id",
    title: "Leads",
    element: Leads,
  },

  {
    path: "/marketing/logs",
    title: "Activity Logs",
    element: ActivityLogs,
  },

  {
    path: "/marketing/salary-record",
    title: "Salary Record",
    element: SalaryRecord,
  },

  {
    path: "/marketing/settings",
    title: "Settings",
    element: Settings,
  },
];
