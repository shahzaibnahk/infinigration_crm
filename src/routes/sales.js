import LeadActivities from "../pages/common/LeadActivities";
import SalaryRecord from "../pages/common/SalaryRecord";
import Settings from "../pages/common/Settings";
import ActivityLogs from "../pages/marketing/ActivityLogs";
import AddRemarks from "../pages/sales/AddRemarks";
import Leads from "../pages/sales/leads/Leads";
import UpdateLeadStatus from "../pages/sales/leads/UpdateLeadStatus";
import SalesDashboard from "../pages/sales/SalesDashboard";

export const salesRoutes = [
  {
    path: "/sales/dashboard",
    title: "Sales Dashboard",
    element: SalesDashboard,
  },

  {
    path: "/sales/lead/:id/activities",
    title: "Lead Activities",
    element: LeadActivities,
  },

  {
    path: "/sales/leads/:id",
    title: "Assigned Leads",
    element: Leads,
  },

  {
    path: "/sales/lead/:id/update-status",
    title: "Update Lead Status",
    element: UpdateLeadStatus,
  },
  {
    path: "/sales/lead/:id/remarks/add",
    title: "Add Lead Remark",
    element: AddRemarks,
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
