import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ClientProfile } from "../models/ClientProfile.js";
import { Lead } from "../models/Lead.js";
import { Program } from "../models/Program.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import moment from "moment-timezone";
import cloudinary from "cloudinary";
const today = moment().tz("Asia/Karachi").format().toString();

export const getAllLeads = catchAsyncError(async (req, res, next) => {
  const { date, filter } = req.query;
  const leads = await Lead.find({ createdAt: date, category: filter }).populate(
    "assignedTo"
  );
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
  const { name, city, phone, source, date } = req.body;
  const user = await User.findById(req.user._id);

  if (!name || !city || !phone || !source || !date) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let lead = await Lead.create({
    name,
    city,
    phone,
    source,
    createdAt: date,
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
  const { leads, date } = req.body;
  const user = await User.findById(req.user._id);

  if (!leads || leads.length === 0 || !date) {
    return next(new ErrorHandler("Please provide valid leads data", 400));
  }

  const promises = leads.map(async (l) => {
    const lead = await Lead.create({
      name: l.name,
      city: l.city,
      phone: l.phone,
      source: l.source,
      createdAt: date,
      createdBy: user._id,
    });

    const log = {
      date: date,
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

export const bulkLeadDelete = catchAsyncError(async (req, res, next) => {
  const { leads, date } = req.body;
  const user = await User.findById(req.user._id);

  if (!leads || leads.length === 0 || !date) {
    return next(new ErrorHandler("Please provide valid leads data", 400));
  }

  const leadIds = Array.isArray(leads) ? leads : [leads];
  console.log(leadIds);
  leadIds.map(async (l) => {
    let lead = await Lead.findById(l);
    await lead.deleteOne();
    addUserLogs(user, today, `${lead.uid} Lead created`);
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: `${leads.length} Leads deleted successfully`,
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
  const { leads, employee, date } = req.body;

  if (!leads || !employee || !date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  const selectedEmployee = await User.findById(employee);
  if (!selectedEmployee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  try {
    await Promise.all(
      leads.map(async (l) => {
        const lead = await Lead.findById(l);
        if (!lead) {
          throw new ErrorHandler(`Lead with ID ${l} not found`, 404);
        }
        if (lead.status === "assigned" && lead.category === "fresh") {
          throw new ErrorHandler(`Lead ${l} is already assigned`, 401);
        }

        if (lead.status === "assigned" && lead.category === "returned") {
          lead.category = "shuffled";
        }

        lead.assignedTo = selectedEmployee._id;
        lead.leadAssignedAt = date;
        lead.status = "assigned";

        lead.logs.push({
          date: date,
          doneBy: req.user._id,
          task: `Lead is assigned to ${selectedEmployee.name}`,
        });

        addUserLogs(
          req.user,
          date,
          `${lead.uid} is assigned to ${selectedEmployee.name}`
        );
        await lead.save();

        await ClientProfile.create({
          lead: lead._id,
          name: lead.name,
          city: lead.city,
          phone: lead.phone,
        });

        lead.logs.push({
          date: date,
          doneBy: req.user._id,
          task: `Client profile created`,
        });
      })
    );

    res.status(200).json({
      success: true,
      message: "Leads assigned successfully",
    });
  } catch (error) {
    next(error); // Pass any errors to the global error handler
  }
});

export const getSalesAssignedLeads = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { date, category } = req.query;

  if (!date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  const leads = await Lead.find({
    assignedTo: id,
    category: category,
  });

  let assignedLeads = leads.filter(
    (l) => l.leadAssignedAt.split("T")[0] === date
  );
  res.status(200).json({
    success: true,
    assignedLeads,
  });
});

export const updateClientProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    email,
    city,
    phone,
    cnic,
    age,
    education,
    experience,
    travelHistory,
    address,
    dob,
    passport,
    program,
    date,
  } = req.body;

  let lead = await Lead.findById(id);
  let user = await User.findById(req.user._id);
  let clientProfile = await ClientProfile.findOne({ lead: id });
  const selectedProgram = await Program.findById(program);
  if (!clientProfile) {
    return next(new ErrorHandler("Client profile not found", 404));
  }

  let updatedFields = [];
  if (name && clientProfile.name !== name) {
    clientProfile.name = name;
    updatedFields.push("name");
  }
  if (email && clientProfile.email !== email) {
    clientProfile.email = email;
    updatedFields.push("email");
  }
  if (city && clientProfile.city !== city) {
    clientProfile.city = city;
    updatedFields.push("city");
  }
  if (phone && clientProfile.phone !== phone) {
    clientProfile.phone = phone;
    updatedFields.push("phone");
  }
  if (cnic && clientProfile.cnic !== cnic) {
    clientProfile.cnic = cnic;
    updatedFields.push("cnic");
  }
  if (age && clientProfile.age !== age) {
    clientProfile.age = age;
    updatedFields.push("age");
  }
  if (education && clientProfile.education !== education) {
    clientProfile.education = education;
    updatedFields.push("education");
  }
  if (experience && clientProfile.experience !== experience) {
    clientProfile.experience = experience;
    updatedFields.push("experience");
  }
  if (travelHistory && clientProfile.travelHistory !== travelHistory) {
    clientProfile.travelHistory = travelHistory;
    updatedFields.push("travelHistory");
  }
  if (address && clientProfile.address !== address) {
    clientProfile.address = address;
    updatedFields.push("address");
  }
  if (dob && clientProfile.dob !== dob) {
    clientProfile.dob = dob;
    updatedFields.push("dob");
  }
  if (passport && clientProfile.passport !== passport) {
    clientProfile.passport = passport;
    updatedFields.push("passport");
  }
  if (program && clientProfile.program !== program) {
    clientProfile.program = program;
    lead.program = program;
    let documents = selectedProgram.documents.map((d) => ({
      title: d,
      status: "pending",
    }));

    let process = selectedProgram.timelineProcess.map((t) => ({
      title: t,
      status: "pending",
    }));

    clientProfile.documents = documents;
    clientProfile.timelineProcess = process;
    updatedFields.push("program and documents");
  }

  await addUserLogs(
    req.user,
    date,
    `${
      clientProfile.name
    } client profile updated. Updated fields: ${updatedFields.join(", ")}`
  );

  lead.logs.push({
    date: date,
    doneBy: req.user,
    task: `${
      clientProfile.name
    } client profile updated. Updated fields: ${updatedFields.join(", ")}`,
  });
  await lead.save();
  await user.save();
  await clientProfile.save();

  res.status(200).json({
    success: true,
    message: "Client profile updated successfully",
  });
});

export const getClientProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const profile = await ClientProfile.findOne({ lead: id });
  res.status(200).json({
    success: true,
    profile,
  });
});

export const submitClientDocuments = catchAsyncError(async (req, res, next) => {
  const { id, profile } = req.params;

  let selectedProfile = await ClientProfile.findOne({ lead: profile });
  const file = req.file;

  if (!selectedProfile) {
    return next(new ErrorHandler("Profile Not Found", 404));
  }
  if (!file) {
    return next(new ErrorHandler("Please choose file", 401));
  }
  const selectedDocument = selectedProfile.documents.find(
    (d) => d._id.toString() === id
  );

  if (!selectedDocument) {
    return next(new ErrorHandler("Document not found", 404));
  }

  if (selectedDocument.media.public_id !== "temp_id") {
    await cloudinary.v2.uploader.destroy(selectedDocument.media.public_id);
  }
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  selectedDocument.media.public_id = mycloud.public_id;
  selectedDocument.media.public_url = mycloud.secure_url;
  selectedDocument.status = "uploaded";

  await selectedProfile.save();

  res.status(200).json({
    success: true,
    message: `${selectedDocument.title} is uploaded successfully`,
  });
});

export const returnLeads = catchAsyncError(async (req, res, next) => {
  const { leads, reason, description, date } = req.body;

  if (!leads || !reason || !description | !date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  leads.map(async (l) => {
    let selectedLead = await Lead.findById(l);
    selectedLead.category = "returned";
    selectedLead.leadReturned.by = req.user._id;
    selectedLead.leadReturned.at = date;
    selectedLead.leadReturned.reason = reason;
    selectedLead.leadReturned.description = description;

    selectedLead.logs.push({
      date: date,
      doneBy: req.user._id,
      task: `Lead returned by ${req.user.name} due to ${reason}`,
    });

    await selectedLead.save();
  });

  await addUserLogs(
    req.user,
    date,
    `${leads.length} returned due to ${reason}`
  );

  res.status(200).json({
    success: true,
    message: `${leads.length} Leads returned successfully`,
  });
});

export const changeLeadStatusBySales = catchAsyncError(
  async (req, res, next) => {
    const { status, date } = req.body;
    const { id } = req.params;

    if (!status || !date) {
      return next(new ErrorHandler("Please enter all fields", 401));
    }
    const lead = await Lead.findById(id);

    lead.sales.status = status;

    await addUserLogs(
      req.user,
      date,
      `${lead.uid} status is update to ${status}`
    );

    lead.logs.push({
      date: date,
      doneBy: req.user._id,
      task: `Lead status is update to ${status}`,
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  }
);

export const getLeadsBySalesStatus = catchAsyncError(async (req, res, next) => {
  const { filter, date } = req.query;
  if (!filter) {
    return next(new ErrorHandler("Please enter all fields"));
  }

  let closedLeads = await Lead.find({
    "sales.status": "closed_client",
    createdAt: date,
  })
    .populate("program")
    .populate("assignedTo");

  res.status(200).json({
    success: true,
    closedLeads,
  });
});
