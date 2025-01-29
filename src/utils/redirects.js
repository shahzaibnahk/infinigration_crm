export const redirectUser = (isAuthenticated, user) => {
  if (isAuthenticated && user?.role === "marketing") {
    return "/marketing/dashboard";
  }

  if (isAuthenticated && user?.role === "sales") {
    return "/sales/dashboard";
  }

  if (isAuthenticated && user?.role === "operations") {
    return "/operations/dashboard";
  } else {
    return "/";
  }
};
  