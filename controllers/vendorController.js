import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Transaction } from "../models/Transaction.js";
import { User } from "../models/User.js";
import { Vendor } from "../models/Vendor.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { pushTransactionToAccount } from "../utils/pushTransactionsToAccount.js";
import { Account } from "../models/Account.js";
export const createVendor = catchAsyncError(async (req, res, next) => {
  const { name, email, country, programs, date } = req.body;
  const user = await User.findById(req.user._id);
  if (!name || !email || !country || !programs || !date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  let vendor = await Vendor.findOne({ email: email });
  if (vendor) {
    return next(new ErrorHandler("Vendor already exists", 401));
  }
  vendor = await Vendor.create({
    name,
    email,
    country,
    programs,
    createdAt: date,
    createdBy: user._id,
  });

  addUserLogs(user, date, `${vendor.name} vendor account created`);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Vendor created successfully",
  });
});

export const getAllVendors = catchAsyncError(async (req, res, next) => {
  const vendors = await Vendor.find().populate({
    path: "programs",
    populate: {
      path: "program",
    },
  });
  res.status(200).json({ success: true, vendors });
});

export const getVendorById = catchAsyncError(async (req, res, next) => {
  const vendor = await Vendor.findById(req.params.id).populate({
    path: "programs",
    populate: { path: "program" },
  });

  if (!vendor) return next(new ErrorHandler("Vendor not found", 404));
  res.status(200).json({ success: true, vendor });
});

export const updateVendor = catchAsyncError(async (req, res, next) => {
  const { name, email, country, currency, programs } = req.body;
  const { date } = req.query;
  if (!date) {
    return next(new ErrorHandler("Please enter date", 401));
  }
  const user = await User.findById(req.user._id);
  let vendor = await Vendor.findById(req.params.id);
  if (!vendor) return next(new ErrorHandler("Vendor not found", 404));
  vendor.name = name || vendor.name;
  vendor.email = email || vendor.email;
  vendor.country = country || vendor.country;
  vendor.currency = currency || vendor.currency;
  vendor.programs = programs || vendor.programs;
  await vendor.save();
  addUserLogs(user, date, `${vendor.name} vendor account updated`);
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Vendor updated successfully" });
});

export const deleteVendor = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  if (!date) {
    return next(new ErrorHandler("Please enter date", 401));
  }
  const user = await User.findById(req.user._id);
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return next(new ErrorHandler("Vendor not found", 404));
  await vendor.deleteOne();
  addUserLogs(user, date, `${vendor.name} vendor account deleted`);
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Vendor deleted successfully" });
});

export const addVendorPayment = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  const { vendor, lineItems, account, currency } = req.body;
  const user = await User.findById(req.user._id);
  const file = req.file;

  if (!vendor || !lineItems || !account || !currency) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  const selectedVendor = await Vendor.findById(vendor).select("payments");
  let selectedAccount = await Account.findById(account);
  if (!selectedVendor) {
    return next(new ErrorHandler("Vendor not found", 404));
  }

  if (!selectedVendor.payments) {
    selectedVendor.payments = [];
  }

  const parsedLineItems = Array.isArray(lineItems)
    ? lineItems
    : JSON.parse(lineItems);
  let totalAmount = parsedLineItems.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  let fileData = null;
  if (file) {
    const fileUri = getDataUri(file);
    const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
    fileData = {
      url: uploadedFile.secure_url,
      public_id: uploadedFile.public_id,
    };
  }

  const transaction = await Transaction.create({
    account,
    type: "expense",
    amount: totalAmount,
    currency,
    category: "vendor_payment",
    file: fileData,
    createdAt: date,
    createdBy: req.user._id,
  });

  selectedVendor.payments.push({
    transaction: transaction._id,
    lineItems: parsedLineItems,
  });

  await selectedVendor.save();

  await pushTransactionToAccount(selectedAccount._id, transaction._id, date);

  addUserLogs(
    user,
    date,
    `${selectedVendor.name} vendor payment of amount ${totalAmount} is created`
  );
  await user.save();

  res.status(200).json({
    success: true,
    message: "Vendor payment added successfully",
  });
});
