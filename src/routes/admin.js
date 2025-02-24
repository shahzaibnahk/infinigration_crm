import AdminDashboard from "../pages/admin/AdminDashboard";
import AddNewEmployee from "../pages/admin/employee/AddNewEmployee";
import Employees from "../pages/admin/employee/Employees";
import UpdateEmployee from "../pages/admin/employee/UpdateEmployee";
import AddSubagent from "../pages/admin/subagent/AddSubagent";
import Subagents from "../pages/admin/subagent/Subagents";
import UpdateSubagent from "../pages/admin/subagent/UpdateSubagent";
import ViewSubagent from "../pages/admin/subagent/ViewSubagent";
import AddNewVendor from "../pages/admin/vendor/AddNewVendor";
import UpdateVendor from "../pages/admin/vendor/UpdateVendor";
import Vendors from "../pages/admin/vendor/Vendors";
import ViewVendor from "../pages/admin/vendor/ViewVendor";
import Settings from "../pages/common/Settings";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    title: "Admin Dashboard",
    element: AdminDashboard,
  },

  {
    path: "/admin/vendors/all",
    title: "Vendors",
    element: Vendors,
  },

  {
    path: "/admin/vendors/add",
    title: "Add New Vendor",
    element: AddNewVendor,
  },
  {
    path: "/admin/vendor/:id",
    title: "View Vendor",
    element: ViewVendor,
  },

  {
    path: "/admin/vendor/:id/update",
    title: "Update Vendor",
    element: UpdateVendor,
  },

  {
    path: "/admin/subagents/all",
    title: "Subagents",
    element: Subagents,
  },

  {
    path: "/admin/subagents/add",
    title: "Add New Subagent",
    element: AddSubagent,
  },
  {
    path: "/admin/subagent/:id",
    title: "View Subagent",
    element: ViewSubagent,
  },

  {
    path: "/admin/subagent/:id/update",
    title: "Update Subagent",
    element: UpdateSubagent,
  },

  {
    path: "/admin/employees/all",
    title: "Employees",
    element: Employees,
  },

  {
    path: "/admin/employee/:id/update",
    title: "Update Employee",
    element: UpdateEmployee,
  },

  {
    path: "/admin/employees/add",
    title: "Add New Employee",
    element: AddNewEmployee,
  },
];
