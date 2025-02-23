import AdminDashboard from "../pages/admin/AdminDashboard";
import AddNewVendor from "../pages/admin/vendor/AddNewVendor";
import UpdateVendor from "../pages/admin/vendor/UpdateVendor";
import Vendors from "../pages/admin/vendor/Vendors";
import ViewVendor from "../pages/admin/vendor/ViewVendor";

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
    path: "/admin/vendors/:id/update",
    title: "Update Vendor",
    element: UpdateVendor,
  },
];
