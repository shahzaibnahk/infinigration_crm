import mongoose from "mongoose";

const schema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    enum: ["facebook", "instagram", "others"],
    required: true,
  },

  category: {
    type: String,
    enum: ["fresh", "returned", "shuffled"],
    default: "fresh",
  },

  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },

  remarks: {
    date: {
      type: String,
    },

    doneBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    remark: {
      type: String,
    },
  },

  status: {
    type: String,
    enum: ["assigned", "unassigned"],
    default: "unassigned",
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  leadReturned: {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    at: {
      type: String,
    },

    reason: {
      type: String,
    },

    description: {
      type: String,
    },
  },

  logs: [
    {
      date: { type: String },
      doneBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      task: {
        type: String,
      },
    },
  ],

  leadAssignedAt: {
    type: String,
  },

  sales: {
    status: {
      type: String,
      enum: [
        "raw_lead",
        "followup",
        "meeting_scheduled",
        "delayed_client",
        "visited",
        "closed_client",
      ],
      default: "raw_lead",
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

schema.pre("validate", async function (next) {
  if (this.isNew) {
    const lastLead = await this.constructor.findOne().sort({ createdAt: -1 });
    let newId = "L-0001";

    if (lastLead) {
      const lastId = lastLead.uid;
      const num = parseInt(lastId.split("-")[1], 10) + 1;
      newId = `L-${String(num).padStart(4, "0")}`;
    }

    this.uid = newId;
  }
  next();
});

export const Lead = mongoose.model("Lead", schema);
