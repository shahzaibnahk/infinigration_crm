import moment from "moment";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Payroll } from "../models/Payrolls.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createPayrollForUser = async (employeeId, salary) => {
  const currentYear = moment().tz("Asia/Karachi").format("YYYY");
  const months = moment.months().map((month) => ({
    month,
    basicSalary: salary,
    commissions: [],
    deductions: [],
    isPaid: false,
    paidAt: "",
    dispatchedBy: null,
  }));
  let payroll = await Payroll.findOne({ employee: employeeId });
  if (!payroll) {
    payroll = new Payroll({
      employee: employeeId,
      payrolls: [{ year: currentYear, months }],
    });
  } else {
    const existingYear = payroll.payrolls.find((p) => p.year === currentYear);
    if (!existingYear) {
      payroll.payrolls.push({ year: currentYear, months });
    }
  }
  await payroll.save();
};

export const getAllPayrolls = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  const currentDate = moment(date).tz("Asia/Karachi");
  const currentYear = currentDate.format("YYYY");
  const currentMonthName = currentDate.format("MMMM");

  let payrolls = await Payroll.find().populate("employee");

  let filteredByYear = payrolls
    .map((p) => {
      const yearPayroll = p.payrolls.find((py) => py.year === currentYear);
      if (yearPayroll) {
        return {
          employee: p.employee,
          months: yearPayroll.months.filter(
            (m) => m.month === currentMonthName
          ),
        };
      }
      return null;
    })
    .filter((p) => p && p.months.length > 0);

  res.status(200).json({
    success: true,
    payrolls: filteredByYear,
  });
});

export const getPayrollByEmployee = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const currentDate = moment().tz("Asia/Karachi");
  const currentYear = currentDate.format("YYYY");
  const currentMonthName = currentDate.format("MMMM");

  let payroll = await Payroll.findOne({ employee: id }).populate("employee");

  if (!payroll) {
    return next(new ErrorHandler("Payroll not found", 404));
  }

  const yearPayroll = payroll.payrolls.find((py) => py.year === currentYear);
  if (!yearPayroll) {
    return next(
      new ErrorHandler("Payroll for the current year not found", 404)
    );
  }

  const monthPayroll = yearPayroll.months.find(
    (m) => m.month === currentMonthName
  );
  if (!monthPayroll) {
    return next(
      new ErrorHandler("Payroll for the current month not found", 404)
    );
  }

  res.status(200).json({
    success: true,
    payroll: { employee: payroll.employee, payroll: monthPayroll },
  });
});

export const markPayrollAsPaid = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;
  const currentDate = moment(date).tz("Asia/Karachi");
  const currentYear = currentDate.format("YYYY");
  const currentMonthName = currentDate.format("MMMM");

  let payroll = await Payroll.findOne({ employee: id });

  if (!payroll) {
    return next(new ErrorHandler("Payroll not found", 404));
  }

  const yearPayroll = payroll.payrolls.find((py) => py.year === currentYear);
  if (!yearPayroll) {
    return next(
      new ErrorHandler("Payroll for the current year not found", 404)
    );
  }

  const monthPayroll = yearPayroll.months.find(
    (m) => m.month === currentMonthName
  );
  if (!monthPayroll) {
    return next(
      new ErrorHandler("Payroll for the current month not found", 404)
    );
  }

  monthPayroll.isPaid = true;
  monthPayroll.paidAt = currentDate.format("YYYY-MM-DD");
  monthPayroll.dispatchedBy = req.user._id;

  await payroll.save();

  res.status(200).json({
    success: true,
    message: "Payroll marked as paid successfully",
  });
});

export const addCommissionToPayroll = async (
  id,
  clientId,
  amount,
  currency
) => {
  const currentDate = moment().tz("Asia/Karachi");
  const currentYear = currentDate.format("YYYY");
  const currentMonthName = currentDate.format("MMMM");

  let payroll = await Payroll.findOne({ employee: id });

  if (!payroll) {
    return "Payroll not found";
  }

  const yearPayroll = payroll.payrolls.find((py) => py.year === currentYear);
  if (!yearPayroll) {
    return next(
      new ErrorHandler("Payroll for the current year not found", 404)
    );
  }

  const monthPayroll = yearPayroll.months.find(
    (m) => m.month === currentMonthName
  );
  if (!monthPayroll) {
    return next(
      new ErrorHandler("Payroll for the current month not found", 404)
    );
  }

  monthPayroll.commissions.push({ client: clientId, amount, currency });

  await payroll.save();

  res.status(200).json({
    success: true,
    message: "Commission added to payroll successfully",
  });
};

export const addDeductionToPayroll = async (id, reason, amount, currency) => {
  const currentDate = moment().tz("Asia/Karachi");
  const currentYear = currentDate.format("YYYY");
  const currentMonthName = currentDate.format("MMMM");

  let payroll = await Payroll.findOne({ employee: id });

  if (!payroll) {
    return next(new ErrorHandler("Payroll not found", 404));
  }

  const yearPayroll = payroll.payrolls.find((py) => py.year === currentYear);
  if (!yearPayroll) {
    return next(
      new ErrorHandler("Payroll for the current year not found", 404)
    );
  }

  const monthPayroll = yearPayroll.months.find(
    (m) => m.month === currentMonthName
  );
  if (!monthPayroll) {
    return next(
      new ErrorHandler("Payroll for the current month not found", 404)
    );
  }

  monthPayroll.deductions.push({ reason, amount, currency });

  await payroll.save();

  res.status(200).json({
    success: true,
    message: "Deduction added to payroll successfully",
  });
};

export const removeCommissionFromPayroll = async (id, commissionId) => {
  const currentDate = moment().tz("Asia/Karachi");
  const currentYear = currentDate.format("YYYY");
  const currentMonthName = currentDate.format("MMMM");

  let payroll = await Payroll.findOne({ employee: id });

  if (!payroll) {
    return next(new ErrorHandler("Payroll not found", 404));
  }

  const yearPayroll = payroll.payrolls.find((py) => py.year === currentYear);
  if (!yearPayroll) {
    return next(
      new ErrorHandler("Payroll for the current year not found", 404)
    );
  }

  const monthPayroll = yearPayroll.months.find(
    (m) => m.month === currentMonthName
  );
  if (!monthPayroll) {
    return next(
      new ErrorHandler("Payroll for the current month not found", 404)
    );
  }

  monthPayroll.commissions = monthPayroll.commissions.filter(
    (c) => c._id.toString() !== commissionId
  );

  await payroll.save();

  res.status(200).json({
    success: true,
    message: "Commission removed from payroll successfully",
  });
};

export const removeDeductionFromPayroll = async (id, deductionId) => {
  const currentDate = moment().tz("Asia/Karachi");
  const currentYear = currentDate.format("YYYY");
  const currentMonthName = currentDate.format("MMMM");

  let payroll = await Payroll.findOne({ employee: id });

  if (!payroll) {
    return next(new ErrorHandler("Payroll not found", 404));
  }

  const yearPayroll = payroll.payrolls.find((py) => py.year === currentYear);
  if (!yearPayroll) {
    return next(
      new ErrorHandler("Payroll for the current year not found", 404)
    );
  }

  const monthPayroll = yearPayroll.months.find(
    (m) => m.month === currentMonthName
  );
  if (!monthPayroll) {
    return next(
      new ErrorHandler("Payroll for the current month not found", 404)
    );
  }

  monthPayroll.deductions = monthPayroll.deductions.filter(
    (d) => d._id.toString() !== deductionId
  );

  await payroll.save();

  res.status(200).json({
    success: true,
    message: "Deduction removed from payroll successfully",
  });
};
