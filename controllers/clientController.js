import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Client } from "../models/Client.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import { ClientProfile } from "../models/ClientProfile.js";
import { Lead } from "../models/Lead.js";

export const createClient = catchAsyncError(async (req, res, next) => {
  const {
    lead,
    contractTemplate,
    installments,
    operationsHead,
    operationsSubordinate,
    discount,
    signatory,
    date,
  } = req.body;

  if (
    !lead ||
    !contractTemplate ||
    !installments ||
    !operationsHead ||
    !operationsSubordinate ||
    !signatory ||
    !date
  ) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  const selectedUser = await User.findById(req.user._id);
  const selectedLead = await Lead.findById(lead);
  const selectedProfile = await ClientProfile.findOne({
    lead: selectedLead._id,
  });

  await Client.create({
    profile: selectedProfile._id,
    contractTemplate,
    installments,
    salesPerson: lead.assignedTo,
    operationsHead,
    operationsSubordinate,
    signatory,
    createdAt: date,
    createdBy: selectedUser._id,
  });

  addUserLogs(selectedUser, date, `Client and Contract Created`);
  await selectedUser.save();

  res.status(200).json({
    success: true,
    message: "Client Created Successfully",
  });
});

export const getAllClients = catchAsyncError(async (req, res, next) => {
  const clients = await Client.find()
    .populate({
      path: "profile",
      populate: {
        path: "program",
      },
    })
    .populate("contractTemplate")
    .populate("salesPerson")
    .populate("operationsHead")
    .populate("operationsSubordinate")
    .populate("createdBy")
    .populate("signatory");

  res.status(200).json({
    success: true,
    clients,
  });
});

export const getClientById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const client = await Client.findById(id)
    .populate({
      path: "profile",
      populate: {
        path: "program",
      },
    })
    .populate("contractTemplate")
    .populate("salesPerson")
    .populate("operationsHead")
    .populate("operationsSubordinate")
    .populate("createdBy")
    .populate("signatory");

  res.status(200).json({
    success: true,
    client,
  });
});

export const getClientAsOptions = catchAsyncError(async (req, res, next) => {
  const clients = await Client.find()
    .populate("profile")
    .populate("contractTemplate")
    .populate("salesPerson")
    .populate("operationsHead")
    .populate("operationsSubordinate")
    .populate("createdBy")
    .populate("signatory");

  let options = clients.map((c) => ({
    value: c._id,
    label: c.profile.name,
  }));

  res.status(200).json({
    success: true,
    options,
  });
});

export const updateClient = catchAsyncError(async (req, res, next) => {
  const {
    id,
    contractTemplate,
    installments,
    operationsHead,
    operationsSubordinate,
    signatory,
    discount,
    date,
  } = req.body;

  console.log(id)

  const client = await Client.findById(id).populate("profile");
  const user = await User.findById(req.user._id);
  if (!client) {
    return next(new ErrorHandler("Client not found", 404));
  }

  if (contractTemplate) client.contractTemplate = contractTemplate;
  if (installments) client.installments = installments;
  if (operationsHead) client.operationsHead = operationsHead;
  if (discount) client.discount = discount;
  if (operationsSubordinate)
    client.operationsSubordinate = operationsSubordinate;
  if (signatory) client.signatory = signatory;

  await client.save();
  addUserLogs(user, date, `${client.profile.name} client updated`);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Client Updated Successfully",
  });
});

export const deleteClient = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;
  const selectedUser = await User.findById(req.user._id);
  const client = await Client.findById(id).populate("profile");

  await client.deleteOne();
  addUserLogs(selectedUser, date, `${client.profile.name} client deleted`);
  await selectedUser.save();

  res.status(200).json({
    success: true,
    message: "Client Deleted Successfully",
  });
});

export const markClientStageCompleted = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const { date, tId } = req.query;
    const selectedUser = await User.findById(req.user._id);
    const clientSelected = await ClientProfile.findById(id);
    const timeLineProcess = clientSelected?.timelineProcess.find((c) => {
      if (c._id.toString() === tId) {
        return c;
      }
    });

    console.log(timeLineProcess);
    if (!timeLineProcess) {
      return next(new ErrorHandler("Timeline Process not found", 404));
    }
    timeLineProcess.status = "completed";

    addUserLogs(
      selectedUser,
      date,
      `${timeLineProcess.title} marked completed`
    );

    await selectedUser.save();
    await clientSelected.save();

    res.status(200).json({
      success: true,
      message: "Stage Marked Successfully",
    });
  }
);
