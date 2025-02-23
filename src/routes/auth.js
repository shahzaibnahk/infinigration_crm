import Login from "../pages/auth/Login";
import Error404 from "../pages/common/Error404";

export const authRoutes = [
  {
    path: "/",
    title: "Login",
    element: Login,
  },

  {
    path: "*",
    title: "Error 404",
    element: Error404,
  },
];


