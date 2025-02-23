import moment from "moment";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Invoice } from "../models/Invoice.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import { Client } from "../models/Client.js";
import { Lead } from "../models/Lead.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { Account } from "../models/Account.js";
import { Transaction } from "../models/Transaction.js";
import { pushTransactionToAccount } from "../utils/pushTransactionsToAccount.js";
import { addCommissionToPayroll } from "./payrollController.js";

export const createInvoice = catchAsyncError(async (req, res, next) => {
  const {
    client,
    currency,
    invoiceItem,
    date,
    salesCommission,
    operationsHeadCommission,
    operationsSubordinateCommission,
  } = req.body;
  const selectedUser = await User.findById(req.user._id);

  console.log(
    client,
    currency,
    invoiceItem,
    date,
    salesCommission,
    operationsHeadCommission,
    operationsSubordinateCommission
  );
  if (!client || !currency || !invoiceItem || !date) {
    console.log(true);
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  let selectedClient = await Client.findById(client).populate("profile");

  let invoice = await Invoice.create({
    client: selectedClient._id,
    currency: currency,
    totalAmount: invoiceItem.amount,
    invoiceItem: invoiceItem,
    salesCommission: salesCommission,
    operationsHeadCommission: operationsHeadCommission,
    operationsSubordinateCommission: operationsSubordinateCommission,
    createdAt: date,
  });

  const lead = await Lead.findById(selectedClient.profile.lead);
  addUserLogs(
    selectedUser,
    date,
    `${selectedClient.profile.name} invoice has been created`
  );

  lead.logs.push({
    date,
    selectedUser,
    task: `Invoice has been created`,
  });

  await selectedUser.save();
  await lead.save();

  res.status(200).json({
    success: true,
    message: "Invoice Created Successfully",
  });
});

export const getInstallmentsByClient = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) return next(new ErrorHandler("Client not found", 404));

    let installments = client.installments.filter((i) => i.status != "paid");

    res.status(200).json({
      success: true,
      installments,
    });
  }
);

export const getAllInvoices = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  if (!date) {
    return next(new ErrorHandler("Please enter date", 401));
  }
  const month = moment(date).tz("Asia/Karachi").format("MM");

  let invoices = await Invoice.find().populate({
    path: "client",
    populate: { path: "profile" },
  });

  invoices = invoices.filter((i) => {
    if (i.createdAt.split("-")[1] === month) {
      return i;
    }
  });

  res.status(200).json({ success: true, invoices });
});

export const getInvoiceById = catchAsyncError(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id).populate({
    path: "client",
    populate: [
      { path: "profile", populate: { path: "program" } },
      { path: "salesPerson" },
    ],
  });

  if (!invoice) return next(new ErrorHandler("Invoice not found", 404));
  res.status(200).json({ success: true, invoice });
});

export const updateInvoice = catchAsyncError(async (req, res, next) => {
  let invoice = await Invoice.findById(req.params.id);
  const { date } = req.query;
  if (!invoice) return next(new ErrorHandler("Invoice not found", 404));
  const selectedUser = await User.findById(req.user._id);
  const selectedClient = await Client.findById(invoice.client).populate(
    "profile"
  );
  const lead = await Lead.findById(selectedClient.profile.lead);

  invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  addUserLogs(
    selectedUser,
    date,
    `${selectedClient.profile.name} invoice has been updated`
  );

  lead.logs.push({
    date: date,
    doneBy: selectedUser,
    task: `Invoice has been updated`,
  });

  await selectedUser.save();
  await lead.save();

  res
    .status(200)
    .json({ success: true, message: "Invoice Updated Successfully" });
});

export const deleteInvoice = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return next(new ErrorHandler("Invoice not found", 404));

  const selectedUser = await User.findById(req.user._id);
  const selectedClient = await Client.findById(invoice.client).populate(
    "profile"
  );
  const lead = await Lead.findById(selectedClient.profile.lead);
  await invoice.deleteOne();
  addUserLogs(
    selectedUser,
    date,
    `${selectedClient.profile.name} invoice has been deleted`
  );

  lead.logs.push({
    date: date,
    doneBy: selectedUser,
    task: `Invoice has been deleted`,
  });

  await selectedUser.save();
  await lead.save();
  res
    .status(200)
    .json({ success: true, message: "Invoice Deleted Successfully" });
});

export const markInvoicePaid = catchAsyncError(async (req, res, next) => {
  let invoice = await Invoice.findById(req.params.id);
  const { amount, date, account } = req.body;
  const file = req.file;

  if (!amount || !date || !file || !account) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  if (!invoice) return next(new ErrorHandler("Invoice not found", 404));

  if (amount > invoice.totalAmount) {
    return next(
      new ErrorHandler(
        `Paid amount ${amount} cant be greater than total amount ${invoice.totalAmount}`,
        401
      )
    );
  }

  const selectedClient = await Client.findById(invoice.client);
  let selectedAccount = await Account.findById(account);

  const fileUri = getDataUri(file);
  let mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  invoice.amountPaid = amount;
  invoice.status = amount == invoice.totalAmount ? "paid" : "partially_paid";
  invoice.receipt.url = mycloud.secure_url;
  invoice.receipt.id = mycloud.public_id;
  invoice.paidAt = date;

  let transaction = await Transaction.create({
    account: selectedAccount._id,
    type: "income",
    amount: amount,
    currency: invoice.currency,
    category: "invoice_payment",
    file: {
      url: mycloud.secure_url,
      public_id: mycloud.public_id,
    },
    createdAt: date,
  });
  await pushTransactionToAccount(selectedAccount, transaction, date);

  if (invoice.salesCommission) {
    await addCommissionToPayroll(
      selectedClient.salesPerson,
      invoice.client,
      amount * (process.env.SALES_COMMISSION / 100),
      date
    );
  }

  if (invoice.operationsHeadCommission) {
    await addCommissionToPayroll(
      selectedClient.operationsHead,
      invoice.client,
      amount * (process.env.OPERATIONS_HEAD_COMMISSION_PERCENTAGE / 100),
      date
    );
  }

  if (invoice.operationsSubordinateCommission) {
    await addCommissionToPayroll(
      selectedClient.operationsSubordinate,
      invoice.client,
      amount * (process.env.OPERATIONS_SUBORDINATE_COMMISSION_PERCENTAGE / 100),
      date
    );
  }

  await invoice.save();

  res.status(200).json({ success: true, message: "Invoice Marked as Paid" });
});
