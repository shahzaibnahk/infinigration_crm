import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";

export const getDepartment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const department = await User.find({ role: id });

  res.status(200).json({
    success: true,
    department,
  });
});
