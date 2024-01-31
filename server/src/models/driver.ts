import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
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
    vehicleName: {
      type: String,
      default: "",
    },
    vehicleType: {
      type: String,
      default: "",
    },
    vehicleNumber: {
      type: String,
      default: "",
    },
    isAvailable: {
      type: String,
    },
    rideStatus: {
      type: String,
      default: "",
    },
    // coordinates: {
    //   type: { type: String, default: "Point" },
    //   coordinates: [Number],
    // },
    // availableRides: [
    //   {
    //     startPoint: {
    //       type: { type: String, default: "Start" },
    //       coordinates: [Number],
    //     },
    //     endingPoint: {
    //       type: { type: String, default: "Destination" },
    //       coordinates: [Number],
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

driverSchema.index({ coordinates: "2dsphere" });

export const Driver = mongoose.model("drivers", driverSchema);
