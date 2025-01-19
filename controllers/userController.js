import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import moment from "moment-timezone";
import { Attendance } from "../models/Attendance.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter All Felids", 400));
  }

  let user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Incorrect Email or Password", 409));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Email or Password", 400));
  }

  sendToken(res, user, `Welcome Back ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      sameSite: "none",
      secure: true,

      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully",
    });
});

export const register = catchAsyncError(async (req, res, next) => {
  const {
    name,
    fatherName,
    cnic,
    mobile,
    email,
    password,
    gender,
    dob,
    maritalStatus,
    religion,
    nationality,
    jobTitle,
    role,
    salary,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !fatherName ||
    !cnic ||
    !mobile ||
    !email ||
    !password ||
    !gender ||
    !dob ||
    !maritalStatus ||
    !religion ||
    !nationality ||
    !jobTitle ||
    !role ||
    !salary
  ) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  // Check if the user already exists
  let user = await User.findOne({ email: email });
  if (user) {
    return next(new ErrorHandler("User already exists", 401));
  }

  // Create the user
  user = await User.create({
    name,
    fatherName,
    cnic,
    mobile,
    email,
    password,
    gender,
    dob,
    maritalStatus,
    religion,
    nationality,
    jobTitle,
    role,
    salary,
  });

  // Generate attendance for the entire year
  const year = moment().tz("Asia/Karachi").format("YYYY"); // Set the current year
  const months = Array.from({ length: 12 }, (_, i) =>
    moment().month(i).format("MMMM")
  ); // Array of month names

  const attendanceData = months.map((month) => ({
    month,
    days: Array.from(
      { length: moment(`${year}-${month}`, "YYYY-MMMM").daysInMonth() },
      (_, i) => ({
        date: moment(`${year}-${month}-${i + 1}`, "YYYY-MMMM-D").format(
          "YYYY-MM-DD"
        ),
        status: "absent", // Default status for all days
      })
    ),
  }));

  await Attendance.create({
    employee: user._id, // Associate the user with attendance
    year,
    attendance: attendanceData,
  });

  // Respond with success
  res.status(200).json({
    success: true,
    message: "Account Created Successfully and Attendance Generated",
  });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let selectedUser = await User.findById(id);
  const file = req.file;
  const { name, email } = req.body;

  if (!selectedUser) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  if (name) selectedUser.name = name;
  if (email) selectedUser.email = email;

  if (selectedUser.avatar.public_id != "temp_id") {
    await cloudinary.v2.uploader.destroy(selectedUser.avatar.public_id);
  }

  if (file) {
    let fileUri = getDataUri(file);
    let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    selectedUser.avatar.public_id = myCloud.public_id;
    selectedUser.avatar.url = myCloud.secure_url;
  }

  await selectedUser.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.parms;
  const selectedUser = await User.findById(id);

  if (!selectedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  await selectedUser.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await User.findById(id).select("+password");
  user.password = password;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const getMyAttendance = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;

  // Validate input
  if (!date) {
    return next(new ErrorHandler("User ID and date are required", 400));
  }

  // Parse date components
  const targetDate = moment(date, "YYYY-MM-DD").tz("Asia/Karachi");
  const year = targetDate.format("YYYY");
  const month = targetDate.format("MMMM");
  const day = targetDate.format("YYYY-MM-DD");

  // Find the attendance record
  const attendanceRecord = await Attendance.findOne({
    employee: req.user._id,
    year,
    "attendance.month": month,
  });

  if (!attendanceRecord) {
    return next(new ErrorHandler("Attendance record not found", 404));
  }

  // Locate the specific day's attendance
  const monthData = attendanceRecord.attendance.find((m) => m.month === month);

  if (!monthData) {
    return next(new ErrorHandler("Month data not found in attendance", 404));
  }

  const dayAttendance = monthData.days.find((d) => d.date === day);

  if (!dayAttendance) {
    return next(new ErrorHandler("Day attendance not found", 404));
  }

  // Respond with the day's attendance
  res.status(200).json({
    success: true,
    attendance: dayAttendance,
  });
});

export const markAttendance = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;

  const targetDate = moment(date, "YYYY-MM-DD").tz("Asia/Karachi");
  const year = targetDate.format("YYYY");
  const month = targetDate.format("MMMM");
  const day = targetDate.format("YYYY-MM-DD");

  const attendanceRecord = await Attendance.findOne({
    employee: req.user._id,
    year,
    "attendance.month": month,
  });

  if (!attendanceRecord) {
    return next(new ErrorHandler("Attendance record not found", 404));
  }

  const monthData = attendanceRecord.attendance.find((m) => m.month === month);

  let selectedDay = monthData.days.find(
    (d) => d._id.toString() === id.toString()
  );

  selectedDay.status = "present";
  selectedDay.markedAt = date;
  await attendanceRecord.save();

  res.status(200).json({
    success: true,
    selectedDay,
    message: "Attendance Marked Successfully",
  });
});

export const markLeave = catchAsyncError(async (req, res, next) => {
  const { id, eId } = req.params;
  const { date } = req.query;

  const targetDate = moment(date, "YYYY-MM-DD").tz("Asia/Karachi");
  const year = targetDate.format("YYYY");
  const month = targetDate.format("MMMM");
  const day = targetDate.format("YYYY-MM-DD");

  const attendanceRecord = await Attendance.findOne({
    employee: eId,
    year,
    "attendance.month": month,
  });

  if (!attendanceRecord) {
    return next(new ErrorHandler("Attendance record not found", 404));
  }

  const monthData = attendanceRecord.attendance.find((m) => m.month === month);

  let selectedDay = monthData.days.find(
    (d) => d._id.toString() === id.toString()
  );

  selectedDay.status = "leave";
  selectedDay.markedAt = date;
  await attendanceRecord.save();

  res.status(200).json({
    success: true,
    selectedDay,
    message: "Attendance Marked Successfully",
  });
});

export const getActivityLogs = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { date } = req.query;

  let todayLogs = user.logs.find(
    (l) => l.date.split("T")[0].toString() === date.toString()
  );
  res.status(200).json({
    success: true,
    logs: todayLogs,
  });
});
