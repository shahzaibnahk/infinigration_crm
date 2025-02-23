import mongoose from "mongoose";

const schema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },

  currency: {
    type: String,
    default: "pkr",
  },

  invoiceItem: {
    title: { type: String },
    description: { type: String },
    amount: { type: Number },
  },

  status: {
    type: String,
    enum: ["pending", "partially_paid", "paid"],
    default: "pending",
  },

  totalAmount: {
    type: Number,
    default: 0,
  },

  amountPaid: {
    type: Number,
    default: 0,
  },

  receipt: {
    url: {
      type: String,
      default: "temp_url",
    },

    id: {
      type: String,
      default: "temp_id",
    },
  },

  createdAt: {
    type: String,
  },

  paidAt: {
    type: String,
  },

  salesCommission: {
    type: Boolean,
    default: false,
  },

  operationsHeadCommission: {
    type: Boolean,
    default: false,
  },

  operationsSubOrdinateCommission: {
    type: Boolean,
    default: false,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Invoice = mongoose.model("Invoice", schema);
