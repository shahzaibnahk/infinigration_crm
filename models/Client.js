import mongoose from "mongoose";

const schema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientProfile",
  },
  contractTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContractTemplate",
  },

  installments: [
    {
      stage: {
        type: String,
      },
      remarks: {
        type: String,
      },
      amount: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: ["unpaid", "partially_paid", "paid"],
        default: "unpaid",
      },

      receipt: {
        url: {
          type: String,
          default: "temp_url",
        },

        public_id: {
          type: String,
          default: "temp_id",
        },
      },
    },
  ],

  salesPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  operationsHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  operationsSubordinate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  discount: {
    type: Number,
    default: 0,
  },

  signatory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Client = mongoose.model("Client", schema);
