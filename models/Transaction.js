import mongoose from "mongoose";

const schema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },

  type: {
    type: String,
    enum: ["income", "expense"],
  },

  amount: {
    type: Number,
  },

  currency: {
    type: String,
  },

  category: {
    type: String,
  },

  file: {
    url: {
      type: String,
      default: "temp_url",
    },

    public_id: {
      type: String,
      default: "temp_id",
    },
  },

  createdAt: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Transaction = mongoose.model("Transaction", schema);
