import moment from "moment-timezone";

export const pushTransactionToAccount = async (account, transaction, date) => {
  const year = moment(date).tz("Asia/Karachi").format("YYYY");
  const month = moment(date).tz("Asia/Karachi").format("MM");

  if (!account.transactions) {
    account.transactions = [];
  }

  let yearEntry = account.transactions.find((y) => y.year === year);

  if (!yearEntry) {
    yearEntry = { year, months: [] };
    account.transactions.push(yearEntry);
  }

  const yearIndex = account.transactions.findIndex((y) => y.year === year);

  if (!yearEntry.months) {
    yearEntry.months = [];
  }

  let monthEntry = yearEntry.months.find((m) => m.month === month);

  if (!monthEntry) {
    monthEntry = {
      month,
      transactions: [],
      stats: {
        currentBalance: 0,
        incomings: 0,
        expenses: 0,
        profit: 0,
      },
    };

    account.transactions[yearIndex].months.push(monthEntry);
  }

  const monthIndex = account.transactions[yearIndex].months.findIndex(
    (m) => m.month === month
  );

  if (!account.transactions[yearIndex].months[monthIndex].transactions) {
    account.transactions[yearIndex].months[monthIndex].transactions = [];
  }

  account.transactions[yearIndex].months[monthIndex].transactions.push(
    transaction._id
  );

  if (transaction.type === "income") {
    account.transactions[yearIndex].months[monthIndex].stats.incomings +=
      transaction.amount;
    account.transactions[yearIndex].months[monthIndex].stats.profit +=
      transaction.amount;
  } else if (transaction.type === "expense") {
    account.transactions[yearIndex].months[monthIndex].stats.expenses +=
      transaction.amount;
    account.transactions[yearIndex].months[monthIndex].stats.profit -=
      transaction.amount;
  }

  account.transactions[yearIndex].months[monthIndex].stats.currentBalance +=
    transaction.amount;

  account.lastActivity = transaction._id;

  account.markModified("transactions");

  await account.save();
};
