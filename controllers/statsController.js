import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Lead } from "../models/Lead.js";
import { today } from "../utils/dateAndTime.js";
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
