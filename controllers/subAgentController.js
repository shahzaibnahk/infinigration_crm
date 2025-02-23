import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Account } from "../models/Account.js";
import { Subagent } from "../models/Subagent.js";
import { Transaction } from "../models/Transaction.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createSubagent = catchAsyncError(async (req, res, next) => {
  const { name, email, date } = req.body;
  if (!name || !email || !date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  const user = await User.findById(req.user._id);

  let subAgent = await Subagent.create({
    name: name,
    email: email,
    createdAt: date,
    createdBy: user._id,
  });
  addUserLogs(user, date, `${subAgent.name} Subagent has been created`);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Subagent created successfully",
    subAgent,
  });
});

export const getAllSubagents = catchAsyncError(async (req, res, next) => {
  const subAgents = await Subagent.find().populate("createdBy", "name email");
  res.status(200).json({
    success: true,
    subAgents,
  });
});

export const getSubagentById = catchAsyncError(async (req, res, next) => {
  const subAgent = await Subagent.findById(req.params.id).populate(
    "createdBy",
    "name email"
  );
  if (!subAgent) return next(new ErrorHandler("Subagent not found", 404));
  res.status(200).json({
    success: true,
    subAgent,
  });
});

export const updateSubagent = catchAsyncError(async (req, res, next) => {
  const { name, email, date } = req.body;
  if (!date) {
    return next(new ErrorHandler("Please enter date", 401));
  }
  let subAgent = await Subagent.findById(req.params.id);
  if (!subAgent) return next(new ErrorHandler("Subagent not found", 404));

  subAgent.name = name || subAgent.name;
  subAgent.email = email || subAgent.email;
  await subAgent.save();

  const user = await User.findById(req.user._id);
  addUserLogs(user, new Date(), `${subAgent.name} Subagent has been updated`);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Subagent updated successfully",
    subAgent,
  });
});

export const deleteSubagent = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  if (!date) {
    return next(new ErrorHandler("Please enter date", 401));
  }
  const subAgent = await Subagent.findById(req.params.id);
  if (!subAgent) return next(new ErrorHandler("Subagent not found", 404));

  const user = await User.findById(req.user._id);
  addUserLogs(user, date, `${subAgent.name} Subagent has been deleted`);
  await user.save();

  await subAgent.deleteOne();
  res.status(200).json({
    success: true,
    message: "Subagent deleted successfully",
  });
});

export const addSubagentPayments = catchAsyncError(async (req, res, next) => {
  const { subagent, lineItems, account, currency } = req.body;
  const user = await User.findById(req.user._id);
  const file = req.file;
  if (!subagent || !lineItems || !account || !currency) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  const selectedSubagent = await Vendor.findById(subagent);
  if (!selectedSubagent) {
    return next(new ErrorHandler("Subagent not found", 404));
  }

  let parsedLineItems = JSON.parse(lineItems);
  let selectedAccount = await Account.findById(account);
  let totalAmount = parsedLineItems.reduce((a, b) => a + b, 0);
  const fileUri = getDataUri(file);
  let mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  let transaction = await Transaction.create({
    account: account,
    type: "income",
    amount: totalAmount,
    currency: currency,
    category: "subagent_payment",
    file: {
      url: mycloud.secure_url,
      public_id: mycloud.public_id,
    },
    createdAt: date,
    createdBy: req.user._id,
  });

  let subagentPayment = {
    transaction: transaction,
    lineItems: parsedLineItems,
  };

  selectedSubagent.payments.push(subagentPayment);
  await selectedSubagent.save();

  pushTransactionToAccount(selectedAccount, transaction, date);

  addUserLogs(
    user,
    date,
    `${selectedSubagent.name} subagent payment of amount ${totalAmount} is sent`
  );
  await user.save();

  res.status(200).json({
    success: true,
    message: "Subagent payment added successfully",
  });
});
