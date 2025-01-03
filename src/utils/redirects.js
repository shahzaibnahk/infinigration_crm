export const redirectUser = (isAuthenticated, user) => {
  if (isAuthenticated && user?.role === "marketing") {
    return "/marketing/dashboard";
  } else {
    return "/";
  }
};
