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
          location: String,
          type: { type: String, default: "Start" },
          coordinates: [Number],
          default: [0, 0],
        },
        destination: {
          location: String,
          type: { type: String, default: "Destination" },
          coordinates: [Number],
          default: [0, 0],
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
