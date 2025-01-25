import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ClientProfile } from "../models/ClientProfile.js";
import { Lead } from "../models/Lead.js";
import { Remark } from "../models/Remark.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createRemark = catchAsyncError(async (req, res, next) => {
  const { lead, subject, remark, date } = req.body;
  const user = await User.findById(req.user._id);
  if (!lead || !subject || !remark || !date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  const selectedLead = await Lead.findById(lead);
  const selectedProfile = await ClientProfile.findOne({ lead: lead });

  if (!selectedProfile) {
    return next(new ErrorHandler("Profile Not Found", 404));
  }

  await Remark.create({
    profile: selectedProfile._id,
    subject: subject,
    remark: remark,
    createdAt: date,
    author: req.user._id,
  });

  await addUserLogs(
    user,
    date,
    `Remarks added in ${selectedLead.name} profile`
  );

  await user.save();
  selectedLead.logs.push({
    date: date,
    doneBy: req.user._id,
    task: `${remark} added by ${req.user.name}`,
  });

  await selectedLead.save();
  res.status(200).json({
    success: true,
    message: `Remark added successfully`,
  });
});

export const getProfileRemarks = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const profile = await ClientProfile.findOne({ lead: id });

  if (!profile) {
    return next(new ErrorHandler("Profile Not Found", 404));
  }
  const remarks = await Remark.find({ profile: profile._id }).populate(
    "author"
  );

  res.status(200).json({
    success: true,
    remarks,
  });
});
