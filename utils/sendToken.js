export const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: "lax", // Allow cookies for cross-site navigation while ensuring security
    secure: false, // Allow cookies to work over HTTP
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: message,
    user: user,
  });
};
