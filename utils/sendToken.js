export const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    httpOnly: true, // ✅ Prevent access from JavaScript
    sameSite: "none", // ✅ Required for cross-site cookies (frontend on a different domain)
    secure: true, // ✅ Required for 'sameSite: none' — only works over HTTPS
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: message,
    user: user,
  });
};
