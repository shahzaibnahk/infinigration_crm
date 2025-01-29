import LeadActivities from "../pages/common/LeadActivities";
import SalaryRecord from "../pages/common/SalaryRecord";
import Settings from "../pages/common/Settings";
import ActivityLogs from "../pages/marketing/ActivityLogs";
import AddNewClient from "../pages/operations/AddNewClient";
import Clients from "../pages/operations/Clients";
import ClosedLeads from "../pages/operations/ClosedLeads";
import ViewContract from "../pages/operations/contract/ViewContract";
import OperationDashboard from "../pages/operations/OperationDashboard";
import AddNewProgram from "../pages/operations/program/AddNewProgram";
import Programs from "../pages/operations/program/Programs";
import UpdateProgram from "../pages/operations/program/UpdateProgram";
import AddNewTemplate from "../pages/operations/templates/AddNewTemplate";
import ContractTemplates from "../pages/operations/templates/ContractTemplates";
import UpdateTemplate from "../pages/operations/templates/UpdateContractTemplate";
import TimelineProcess from "../pages/operations/TimelineProcess";
import UpdateClient from "../pages/operations/UpdateClient";
import AddRemarks from "../pages/sales/AddRemarks";

export const operationRoutes = [
  {
    path: "/operations/dashboard",
    title: "Operations Dashboard",
    element: OperationDashboard,
  },

  {
    path: "/operations/closed-leads",
    title: "Closed Leads",
    element: ClosedLeads,
  },

  {
    path: "/operations/clients",
    title: "Clients",
    element: Clients,
  },

  {
    path: "/operations/client/:id/activities",
    title: "Clients",
    element: LeadActivities,
  },

  {
    path: "/operations/client/:id/contract",
    title: "View Contract",
    element: ViewContract,
  },

  {
    path: "/operations/client/:id/timeline-process",
    title: "Timeline Process",
    element: TimelineProcess,
  },

  {
    path: "/operations/client/:id/remarks/add",
    title: "Add Remarks",
    element: AddRemarks,
  },

  {
    path: "/operations/client/:id/update",
    title: "Update Client",
    element: UpdateClient,
  },
  {
    path: "/operations/closed-client/:id/client/add",
    title: "Add New Client",
    element: AddNewClient,
  },

  {
    path: "/operations/programs",
    title: "Programs",
    element: Programs,
  },

  {
    path: "/operations/programs/add",
    title: "Add New Program",
    element: AddNewProgram,
  },
  {
    path: "/operations/program/:id/update",
    title: "Update Program",
    element: UpdateProgram,
  },
  {
    path: "/operations/templates",
    title: "Contract Templates",
    element: ContractTemplates,
  },

  {
    path: "/operations/templates/add",
    title: "Add New Template",
    element: AddNewTemplate,
  },
  {
    path: "/operations/template/:id/update",
    title: "Add New Template",
    element: UpdateTemplate,
  },

  {
    path: "/operations/salary-record",
    title: "Salary Record",
    element: SalaryRecord,
  },

  {
    path: "/operations/logs",
    title: "Activity Logs",
    element: ActivityLogs,
  },

  {
    path: "/operations/settings",
    title: "Settings",
    element: Settings,
  },
];
