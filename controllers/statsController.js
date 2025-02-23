import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Client } from "../models/Client.js";
import { ContractTemplate } from "../models/ContractTemplate.js";
import { Invoice } from "../models/Invoice.js";
import { Lead } from "../models/Lead.js";
import { Program } from "../models/Program.js";
import { Transaction } from "../models/Transaction.js";
import { today } from "../utils/dateAndTime.js";
import ErrorHandler from "../utils/errorHandler.js";
import { getUniqueQuote } from "../utils/quotes.js";
import moment from "moment-timezone";

export const getMarketingStats = catchAsyncError(async (req, res, next) => {
  const quote = getUniqueQuote();

  const today = moment.tz("Asia/Karachi").format("YYYY-MM-DD");
  const startOfMonth = `${today.substring(0, 8)}01`;
  const endOfMonth = moment(today).endOf("month").format("YYYY-MM-DD");
  const startOfYear = `${today.substring(0, 4)}-01-01`;
  const endOfYear = `${today.substring(0, 4)}-12-31`;

  // Fetch and group leads by source for the current month
  const leadsBySource = await Lead.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: {
        _id: "$source",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Prepare data for the doughnut chart
  const labels = leadsBySource.map((item) => item._id || "Unknown");
  const data = leadsBySource.map((item) => item.count);
  const colors = {
    Facebook: "rgba(59, 89, 152, 0.7)",
    Instagram: "rgba(131, 58, 180, 0.7)",
    Other: "rgba(128, 128, 128, 0.7)",
    Unknown: "rgba(169, 169, 169, 0.7)",
  };
  const backgroundColor = labels.map(
    (label) => colors[label] || "rgba(169, 169, 169, 0.7)" // Default background color
  );
  const borderColor = labels.map(
    (label) =>
      colors[label]
        ? colors[label].replace("0.7", "1")
        : "rgba(169, 169, 169, 1)" // Default border color
  );

  // Count leads for each month of the year
  const monthlyLeads = await Lead.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      },
    },
    {
      $group: {
        _id: { $substr: ["$createdAt", 5, 2] }, // Extract month from createdAt
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Fill leads count for all months
  const leadsCountData = Array(12).fill(0);
  monthlyLeads.forEach(({ _id, count }) => {
    leadsCountData[parseInt(_id, 10) - 1] = count;
  });

  // Count today's leads
  const totalLeadsToday = await Lead.find({ createdAt: today });
  const assignedLeadsToday = totalLeadsToday.filter(
    (l) => l.status === "assigned"
  ).length;

  const unAssignedLeadsToday = totalLeadsToday.filter(
    (l) => l.status === "unassigned"
  ).length;

  const marketingStats = {
    quote,
    stats: {
      totalLeadsToday: totalLeadsToday.length,
      assignedLeadsToday,
      unAssignedLeadsToday,
    },
    doughnutChartData: {
      labels,
      datasets: [
        {
          label: "Sources of Leads",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    graphData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Leads Count",
          data: leadsCountData,
          backgroundColor: "#4364b7",
        },
      ],
    },
  };

  res.status(200).json({
    success: true,
    marketingStats,
  });
});

export const getSalesStats = catchAsyncError(async (req, res, next) => {
  const { date } = req.query; // Date in the format "YYYY-MM-DD"
  const quote = getUniqueQuote();
  const userId = req.user._id;

  const [year, month] = date.split("-");

  // Assigned Leads Today
  const assignedLeadsToday = await Lead.find({
    createdAt: date,
    status: "assigned",
    category: "fresh",
    assignedTo: userId,
  });

  // Shuffled Leads Today
  const shuffledLeadsToday = await Lead.find({
    createdAt: date,
    status: "assigned",
    category: "shuffled",
    assignedTo: userId,
  });

  // Returned Leads Today
  const returnedLeadsToday = await Lead.find({
    createdAt: date,
    status: "assigned",
    category: "returned",
    assignedTo: userId,
  });

  // Clients Closed This Month
  const clientsClosed = await Lead.find({
    status: "assigned",
    "sales.status": "closed_client",
    assignedTo: userId,
  });

  const clientsClosedThisMonth = clientsClosed.filter((c) => {
    const [leadYear, leadMonth] = c.createdAt.split("-");
    return leadYear === year && leadMonth === month;
  });

  // Line Chart: Leads Assigned Each Month
  const monthlyAssignedLeads = await Lead.find({
    assignedTo: userId,
    status: "assigned",
  });

  const lineChartData = Array.from({ length: 12 }, (_, index) => {
    const targetMonth = (index + 1).toString().padStart(2, "0"); // Months as "01", "02", etc.
    const count = monthlyAssignedLeads.filter((lead) => {
      const [leadYear, leadMonth] = lead.createdAt.split("-");
      return leadYear === year && leadMonth === targetMonth;
    }).length;

    return {
      month: new Date(2023, index).toLocaleString("default", { month: "long" }),
      count,
    };
  });

  // Doughnut Chart: Sales Status Distribution
  const salesStatusData = await Lead.find({
    assignedTo: userId,
    status: "assigned",
  });

  const doughnutChartData = [
    "raw_lead",
    "followup",
    "meeting_scheduled",
    "delayed_client",
    "visited",
    "closed_client",
  ].map((status) => {
    return {
      status,
      count: salesStatusData.filter((lead) => lead.sales?.status === status)
        .length,
    };
  });

  // Response
  res.status(200).json({
    success: true,
    salesStats: {
      assignedLeadsToday: assignedLeadsToday.length,
      shuffledLeadsToday: shuffledLeadsToday.length,
      returnedLeadsToday: returnedLeadsToday.length,
      clientsClosedThisMonth: clientsClosedThisMonth.length,
      lineChart: lineChartData,
      doughnutChart: doughnutChartData,
      absenteesRemainingThisMonth: 0,
      salaryThisMonth: 0,
      quote,
    },
  });
});

export const getOperationStats = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;
  const quote = getUniqueQuote();
  const timeZone = "America/New_York"; // Replace with your desired time zone

  let closedLeads = await Lead.find({
    createdAt: date,
    "sales.status": "closed_client",
  });

  let clients = await Client.find().populate("profile");
  let programs = await Program.find();
  let templates = await ContractTemplate.find();

  // Prepare data for Bar Chart (Clients per Month)
  const currentYear = moment.tz(timeZone).year();
  const clientsPerMonth = Array(12).fill(0);

  clients.forEach((client) => {
    const createdAt = moment.tz(client.createdAt, timeZone);
    if (createdAt.year() === currentYear) {
      clientsPerMonth[createdAt.month()] += 1; // month() returns 0 for January
    }
  });

  const barChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Clients per Month",
        data: clientsPerMonth,
        backgroundColor: "rgba(41, 37, 255, 0.5)",
        borderColor: "rgb(41, 37, 255)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Doughnut Chart (Clients Split by Program)
  const programStats = programs.map((program) => {
    const clientCount = clients.filter(
      (client) => client.profile?.program?.toString() === program._id.toString()
    ).length;

    return {
      program: `${program.country}-${program.title}`,
      count: clientCount,
    };
  });

  const doughnutChartData = {
    labels: programStats.map((stat) => stat.program),
    datasets: [
      {
        data: programStats.map((stat) => stat.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  res.status(200).json({
    success: true,
    operationStats: {
      quote,
      closedLeadsToday: closedLeads.length,
      totalClients: clients.length,
      totalPrograms: programs.length,
      totalTemplates: templates.length,
      barChartData,
      doughnutChartData,
    },
  });
});

export const getFinanceStats = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;

  if (!date) {
    return next(new ErrorHandler("Date is required", 400));
  }
  const quote = getUniqueQuote();

  let incomingsToday = await Transaction.find({
    createdAt: date,
    type: "income",
  });

  let expensesToday = await Transaction.find({
    createdAt: date,
    type: "expense",
  });

  const invoices = await Invoice.find({
    createdAt: date,
  });

  const invoicesPaid = await Invoice.find({
    createdAt: date,
    status: "paid",
  });

  const invoicesPartiallyPaid = await Invoice.find({
    createdAt: date,
    status: "partially_paid",
  });

  // Get the current year and month
  const currentYear = moment().tz("Asia/Karachi").year();
  const currentMonth = moment().tz("Asia/Karachi").month() + 1; // month() is zero-based

  // Aggregate income and expenses for each month of the current year
  const incomeByMonth = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: `${currentYear}-01-01`,
          $lte: `${currentYear}-12-31`,
        },
        type: "income",
      },
    },
    {
      $group: {
        _id: { $substr: ["$createdAt", 5, 2] }, // Extract month from createdAt
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const expensesByMonth = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: `${currentYear}-01-01`,
          $lte: `${currentYear}-12-31`,
        },
        type: "expense",
      },
    },
    {
      $group: {
        _id: { $substr: ["$createdAt", 5, 2] }, // Extract month from createdAt
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Prepare bar chart data
  const barChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income",
        data: Array(12).fill(0),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: Array(12).fill(0),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  incomeByMonth.forEach((item) => {
    barChartData.datasets[0].data[parseInt(item._id, 10) - 1] = item.total;
  });

  expensesByMonth.forEach((item) => {
    barChartData.datasets[1].data[parseInt(item._id, 10) - 1] = item.total;
  });

  // Prepare doughnut chart data for expenses of the current month
  const expenseCategories = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: `${currentYear}-${String(currentMonth).padStart(2, "0")}-01`,
          $lte: `${currentYear}-${String(currentMonth).padStart(2, "0")}-31`,
        },
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);

  const doughnutChartData = {
    labels: expenseCategories.map((item) => item._id),
    datasets: [
      {
        data: expenseCategories.map((item) => item.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  let stats = {
    quote,
    incomingsToday: incomingsToday.reduce((a, b) => a + b.amount, 0),
    expensesToday: expensesToday.reduce((a, b) => a + b.amount, 0),
    invoicesSent: invoices.length,
    invoicesPaid: invoicesPaid.length,
    invoicesPartiallyPaid: invoicesPartiallyPaid.length,
    barChartData,
    doughnutChartData,
  };

  res.status(200).json({
    success: true,
    stats,
  });
});
