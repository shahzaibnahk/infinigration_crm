import mongoose from "mongoose";

const schema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  year: {
    type: String,
  },

  attendance: [
    {
      month: {
        type: String,
      },
      days: [
        {
          date: {
            type: String,
          },
          status: {
            type: String,
            enum: ["present", "absent", "leave"],
            default: "absent",
          },
          markedAt: {
            type: String,
          },
        },
      ],
    },
  ],
});

export const Attendance = mongoose.model("Attendance", schema);
