import SalaryRecord from "../pages/common/SalaryRecord";
import Settings from "../pages/common/Settings";
import ActivityLogs from "../pages/marketing/ActivityLogs";
import AddNewLead from "../pages/marketing/leads/AddNewLead";
import EditLead from "../pages/marketing/leads/EditLead";
import LeadLogs from "../pages/marketing/leads/LeadLogs";
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
    path: "/marketing/lead/:id/logs",
    title: "Lead Logs",
    element: LeadLogs,
  },

  {
    path: "/marketing/lead/:id/edit",
    title: "Edit Lead",
    element: EditLead,
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
