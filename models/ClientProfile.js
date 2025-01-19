import mongoose from "mongoose";

const schema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },

  cnic: {
    type: String,
  },
  name: {
    type: String,
  },

  phone: { type: String },

  city: { type: String },
  age: {
    type: Number,
    default: 0,
  },

  education: {
    type: String,
  },

  experience: {
    type: String,
  },

  travelHistory: {
    type: String,
  },

  address: {
    type: String,
  },

  dob: {
    type: String,
  },

  email: {
    type: String,
  },
  passportNo: {
    type: String,
  },

  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },

  documents: [
    {
      title: String,
      status: {
        type: String,
        enum: ["pending", "uploaded", "approved", "declined"],
        default: "pending",
      },
      media: {
        public_id: { type: String, default: "temp_id" },
        public_url: { type: String, default: "temp_url" },
      },
    },
  ],

  timelineProcess: [
    {
      title: {
        type: String,
      },
      status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
    },
  ],
});

export const ClientProfile = mongoose.model("ClientProfile", schema);
