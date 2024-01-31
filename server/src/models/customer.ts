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
          type: { type: String, default: "Start" },
          coordinates: [Number],
        },
        destination: {
          type: { type: String, default: "Destination" },
          coordinates: [Number],
        },
        cost: {
          type: Number,
        },
        
      },
    ],
  },
  { timestamps: true }
);

export const Customer = mongoose.model("customers", customerSchema);
