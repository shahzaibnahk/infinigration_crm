import mongoose from "mongoose";

const schema = new mongoose.Schema({
  country: {
    type: String,
  },

  title: {
    type: String,
    unique: true,
  },

  durationOfWorkPermit: {
    type: String,
  },
  currency: {
    type: String,
  },

  totalCost: {
    type: Number,
  },

  deduction: {
    type: Number,
  },

  processDuration: {
    type: String,
  },

  jobs: [
    {
      title: {
        type: String,
      },
      currency: {
        type: String,
      },
      salary: {
        type: Number,
        default: 0,
      },
    },
  ],

  documents: [],

  requirements: [],

  benefits: [],

  timelineProcess: [],

  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "active",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: String,
  },
});

export const Program = mongoose.model("Program", schema);
