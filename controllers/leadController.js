import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Lead } from "../models/Lead.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import ErrorHandler from "../utils/errorHandler.js";
import moment from "moment-timezone";

const today = moment().tz("Asia/Karachi").format().toString();

export const getAllLeads = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  const leads = await Lead.find({ createdAt: date });
  res.status(200).json({
    success: true,
    leads,
  });
});

export const getLeadById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const lead = await Lead.findById(id);
  if (!lead) {
    return next(new ErrorHandler("Lead not found", 404));
  }
  res.status(200).json({
    success: true,
    lead,
  });
});

export const createLead = catchAsyncError(async (req, res, next) => {
  const { name, city, phone, source } = req.body;
  const user = await User.findById(req.user._id);

  if (!name || !city || !phone || !source) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let lead = await Lead.create({
    name,
    city,
    phone,
    source,
    createdAt: today.split("T")[0],
    createdBy: user._id,
  });

  let log = {
    date: today,
    doneBy: req.user._id,
    task: "Lead Created",
  };

  lead.logs.push(log);

  addUserLogs(user, today, `${lead.uid} Lead created`);

  await lead.save();
  await user.save();

  res.status(200).json({
    success: true,
    message: "Lead Created Successfully",
  });
});

export const updateLead = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, city, phone, source } = req.body;
  const lead = await Lead.findById(id);
  const user = await User.findById(req.user._id);

  if (!lead) {
    return next(new ErrorHandler("Lead not found", 404));
  }

  if (name) lead.name = name;
  if (city) lead.city = city;
  if (phone) lead.phone = phone;
  if (source) lead.source = source;

  lead.logs.push({
    date: today,
    doneBy: req.user._id,
    task: `Lead Updated from name -> ${name} city -> ${city} -> phone -> ${phone} source -> ${source}`,
  });

  addUserLogs(
    user,
    today,
    `${lead.uid} Lead Updated from name -> ${name} city -> ${city} -> phone -> ${phone} source -> ${source}`
  );

  await lead.save();
  await user.save();

  res.status(200).json({
    success: true,
    message: "Lead Updated Successfully",
  });
});

export const deleteLead = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const lead = await Lead.findById(id);
  const user = await User.findById(req.user._id);
  if (!lead) {
    return next(new ErrorHandler("Lead not found", 404));
  }
  await lead.deleteOne();
  addUserLogs(user, today, `${lead.uid}: Lead Deleted`);

  res.status(200).json({
    success: true,
    message: "Lead Deleted Successfully",
  });
});
