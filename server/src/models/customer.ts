import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    journey: [
      {
        start: {
          type: String,
        },
        destination: {
          type: String,
        },
        cost: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Customer = mongoose.model("customeras", customerSchema);
