import mongoose from "mongoose";

const schema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  payrolls: [
    {
      year: { type: String },
      months: [
        {
          month: { type: String },
          basicSalary: { type: Number, default: 0 },
          commissions: [
            {
              client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
              amount: { type: Number, default: 0 },
              currency: { type: String },
            },
          ],
          deductions: [
            {
              reason: { type: String },
              amount: { type: Number, default: 0 },
              currency: { type: String },
            },
          ],

          isPaid: {
            type: Boolean,
            default: false,
          },

          paidAt: {
            type: String,
          },
          dispatchedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
    },
  ],
});

export const Payroll = mongoose.model("Payroll", schema);
