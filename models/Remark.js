import mongoose from "mongoose";

const schema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientProfile",
  },
  subject: {
    type: String,
  },

  remark: {
    type: String,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: String,
  },
});

export const Remark = mongoose.model("Remark", schema);
