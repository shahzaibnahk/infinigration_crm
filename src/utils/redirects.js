export const redirectUser = (isAuthenticated, user) => {
  if (isAuthenticated && user?.role === "marketing") {
    return "/marketing/dashboard";
  }

  if (isAuthenticated && user?.role === "sales") {
    return "/sales/dashboard";
  } else {
    return "/";
  }
};
