import mongoose, { mongo } from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: validator.isEmail,
  },
  country: {
    type: String,
  },

  programs: [
    {
      program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
      amount: {
        type: Number,
        default: 0,
      },

      currency: {
        type: String,
      },
    },
  ],

  payments: [
    {
      transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
      lineItems: [
        {
          program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
          amount: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: String,
  },
});

export const Vendor = await mongoose.model("Vendor", schema);
