import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Lead } from "../models/Lead.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import ErrorHandler from "../utils/errorHandler.js";
import moment from "moment-timezone";

const today = moment().tz("Asia/Karachi").format().toString();

export const getAllLeads = catchAsyncError(async (req, res, next) => {
  const { date, filter } = req.query;
  const leads = await Lead.find({ createdAt: date, category: filter });
  res.status(200).json({
    success: true,
    leads,
  });
});

export const getLeadById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const lead = await Lead.findById(id).populate("logs.doneBy");
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

export const bulkUploadLead = catchAsyncError(async (req, res, next) => {
  const { leads } = req.body;
  const user = await User.findById(req.user._id);

  if (!leads || leads.length === 0) {
    return next(new ErrorHandler("Please provide valid leads data", 400));
  }

  const today = new Date().toISOString(); // Ensure `today` is defined
  const promises = leads.map(async (l) => {
    const lead = await Lead.create({
      name: l.name,
      city: l.city,
      phone: l.phone,
      source: l.source,
      createdAt: today.split("T")[0],
      createdBy: user._id,
    });

    const log = {
      date: today,
      doneBy: req.user._id,
      task: "Lead Created",
    };

    lead.logs.push(log);
    addUserLogs(user, today, `${lead.uid} Lead created`);

    await lead.save();
    return lead;
  });

  // Wait for all promises to resolve
  await Promise.all(promises);

  // Save the user data after all operations
  await user.save();

  res.status(200).json({
    success: true,
    message: `${leads.length} Leads created successfully`,
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
    task: `Lead Updated from ${lead.name}: ${name}, ${lead.city}: ${city},  ${lead.phone} -> ${phone},  ${lead.source}: ${source}`,
  });

  addUserLogs(
    user,
    today,
    `${lead.uid} Lead Updated from ${lead.name}: ${name}, ${lead.city}: ${city},  ${lead.phone}: ${phone},  ${lead.source}: ${source}`
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

export const assignLeads = catchAsyncError(async (req, res, next) => {
  const { leads, employee } = req.body;

  if (!leads || !employee) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  let selectedEmployee = await User.findById(employee);
  if (!selectedEmployee) {
    return next(new ErrorHandler("Employee not found", 404));
  }
  leads &&
    leads.length > 0 &&
    leads.map(async (l) => {
      let lead = await Lead.findById(l);
      if (lead.status === "assigned") {
        return next(new ErrorHandler("Lead is already assigned", 401));
      }

      lead.assignedTo = selectedEmployee._id;
      lead.status = "assigned";

      lead.logs.push({
        date: today,
        doneBy: req.user._id,
        task: `Lead is assigned to ${selectedEmployee.name}`,
      });

      addUserLogs(
        req.user,
        today,
        `${lead.uid} is assigned to ${selectedEmployee.name}`
      );

      await lead.save();
    });

  res.status(200).json({
    success: true,
    message: "Leads assigned successfully",
  });
});
