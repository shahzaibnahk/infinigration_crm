import moment from "moment";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Account } from "../models/Account.js";
import { Transaction } from "../models/Transaction.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import ErrorHandler from "../utils/errorHandler.js";
import { pushTransactionToAccount } from "../utils/pushTransactionsToAccount.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const createAccount = catchAsyncError(async (req, res, next) => {
  const { title, type, currency, date } = req.body;
  if (!title || !type || !currency || !date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  const selectedUser = await User.findById(req.user._id);
  let account = await Account.create({
    title: title,
    type: type,
    currency: currency,
    createdAt: date,
    createdBy: req.user._id,
  });

  addUserLogs(selectedUser, date, `${account.title} account is created`);
  await selectedUser.save();

  res.status(200).json({
    success: true,
    message: "Account created successfully",
  });
});

export const getAllAccounts = catchAsyncError(async (req, res, next) => {
  const accounts = await Account.find({}).populate("lastActivity").lean();

  res.status(200).json({
    success: true,
    accounts,
  });
});

export const getAccountById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;

  if (!date) {
    return next(new ErrorHandler("Please enter date", 401));
  }

  if (!id) {
    return next(new ErrorHandler("Invalid Account Id", 401));
  }

  const year = moment(date).tz("Asia/Karachi").format("YYYY");
  const month = moment(date).tz("Asia/Karachi").format("MM");

  const account = await Account.findOne({ _id: id }).lean();

  if (!account) {
    return next(new ErrorHandler("Account Not Found", 404));
  }

  // Find the year data
  const yearData = account.transactions?.find((y) => y.year === year);
  if (!yearData) {
    return res.status(200).json({
      success: true,
      account: {
        ...account,
        transactions: [],
      },
    });
  }

  // Find the month data
  const monthData = yearData.months?.find((m) => m.month === month);
  if (!monthData) {
    return res.status(200).json({
      success: true,
      account: {
        ...account,
        transactions: [],
      },
    });
  }

  // Populate transactions inside monthData
  const populatedTransactions = await Transaction.find({
    _id: { $in: monthData.transactions },
  });

  res.status(200).json({
    success: true,
    account: {
      _id: account._id,
      title: account.title,
      type: account.type,
      currency: account.currency,
      status: account.status,
      lastActivity: account.lastActivity,
      createdAt: account.createdAt,
      createdBy: account.createdBy,
      transactions: populatedTransactions,
      stats: monthData.stats,
    },
  });
});

export const updateAccount = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, type, currency, date } = req.body;
  const selectedUser = await User.findById(req.user._id);
  if (!date) {
    return next(new ErrorHandler("Please enter date", 401));
  }
  const account = await Account.findById(id);

  if (!account) {
    return next(new ErrorHandler("Account Not Found", 404));
  }

  if (title) account.title = title;
  if (type) account.type = type;
  if (currency) account.currency = currency;

  await account.save();

  addUserLogs(selectedUser, date, `${account.title} account updated`);
  await selectedUser.save();
  res.status(200).json({
    success: true,
    message: "Account updated successfully",
  });
});

export const deleteAccount = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  const { date } = req.query;

  const account = await Account.findById(id);

  if (!account) {
    return next(new ErrorHandler("Account not found", 404));
  }
  const selectedUser = await User.findById(req.user._id);

  const transactions = await Transaction.find({ account: id });

  for (const transaction of transactions) {
    let t = await Transaction.findById(transaction);
    t.deleteOne();
  }

  addUserLogs(selectedUser, date, `${account.title} account has been deleted`);
  await account.deleteOne(account._id);
  await selectedUser.save();

  res.status(200).json({
    success: true,
    message: "Account Deleted Successfully",
  });
});

export const addBalance = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { amount, date, currency } = req.body;
  const file = req.file;
  const selectedAccount = await Account.findById(id);
  const selectedUser = await User.findById(req.user._id);

  if (!selectedAccount) {
    return next(new ErrorHandler("Account not found", 404));
  }

  if (!file || !amount || !date || !currency) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  const fileUri = getDataUri(file);

  let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const transaction = await Transaction.create({
    account: selectedAccount._id,
    type: "income",
    amount,
    currency,
    category: "owner_capital",
    file: {
      url: myCloud.secure_url,
      public_id: myCloud.public_id,
    },
    createdAt: date,
    createdBy: selectedUser._id,
  });

  await pushTransactionToAccount(selectedAccount, transaction, date);

  addUserLogs(
    selectedUser,
    date,
    `${amount} ${currency} added to ${selectedAccount.title} account`
  );
  await selectedUser.save();
  res.status(200).json({
    success: true,
    message: "Transaction Added Successfully",
  });
});

export const getTransactionsByType = catchAsyncError(async (req, res, next) => {
  const { filter, date } = req.query;
  console.log(filter, date);

  if (!filter || !date) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }
  let month = moment(date).tz("Asia/Karachi").format("MM");
  let transactions = await Transaction.find({ type: filter });

  console.log(transactions);

  transactions =
    transactions &&
    transactions.length > 0 &&
    transactions.filter((t) => {
      if (t.createdAt.split("-")[1] === month) {
        return t;
      }
    });

  res.status(200).json({
    success: true,
    transactions,
  });
});

export const getTransactionsByCategory = catchAsyncError(
  async (req, res, next) => {
    const { filter, date } = req.query;
    if (!filter || !date) {
      return next(new ErrorHandler("Please enter all fields", 401));
    }
    let month = moment(date).tz("Asia/Karachi").format("MM");
    let transactions = await Transaction.find({ category: filter });

    transactions = transactions.filter((t) => {
      if (t.createdAt.split("-")[1] === month) {
        return t;
      }
    });

    res.status(200).json({
      success: true,
      transactions,
    });
  }
);

export const addExpense = catchAsyncError(async (req, res, next) => {
  const { account, amount, category, date, currency } = req.body;
  const file = req.file;
  const selectedAccount = await Account.findById(account);
  const selectedUser = await User.findById(req.user._id);

  if (!selectedAccount) {
    return next(new ErrorHandler("Account not found", 404));
  }

  if (!file || !amount || !date || !currency || !category) {
    return next(new ErrorHandler("Please enter all fields", 401));
  }

  const fileUri = getDataUri(file);

  let myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const transaction = await Transaction.create({
    account: selectedAccount._id,
    type: "expense",
    amount,
    currency,
    category: category,
    file: {
      url: myCloud.secure_url,
      public_id: myCloud.public_id,
    },
    createdAt: date,
    createdBy: selectedUser._id,
  });

  await pushTransactionToAccount(selectedAccount, transaction, date);

  addUserLogs(
    selectedUser,
    date,
    `${amount} ${currency} added to ${selectedAccount.title} account`
  );
  await selectedUser.save();
  res.status(200).json({
    success: true,
    message: "Transaction Added Successfully",
  });
});
