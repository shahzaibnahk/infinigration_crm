import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String },

  type: { type: String, enum: ["cash", "bank"], default: "bank" },

  currency: { type: String },

  transactions: [
    {
      year: { type: String },
      months: [
        {
          month: { type: String },
          transactions: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
          ],
          stats: {
            currentBalance: { type: Number, default: 0 },
            incomings: { type: Number, default: 0 },
            expenses: { type: Number, default: 0 },
            profit: { type: Number, default: 0 },
          },
        },
      ],
    },
  ],

  status: { type: String, enum: ["active", "disabled"], default: "active" },

  lastActivity: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },

  createdAt: { type: String },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Account = mongoose.model("Account", schema);
