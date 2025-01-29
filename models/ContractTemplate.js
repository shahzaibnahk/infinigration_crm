import mongoose from "mongoose";

const schema = new mongoose.Schema({
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  title: { type: String, unique: [true, "Title must be unique"] },

  description: {
    type: String,
  },

  dutiesOfConsultant: [{ type: String }],
  dutiesOfClient: [{ type: String }],
  agreementByClient: [{ type: String }],
  consultancyFeeAndSchedule: { type: String },
  otherFees: [
    {
      service: {
        type: String,
      },
      paymentTerm: {
        type: String,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
  note: {
    type: String,
  },

  refundPolicies: [{ type: String }],

  consent: {
    type: String,
  },

  createdAt: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const ContractTemplate = mongoose.model("ContractTemplate", schema);
