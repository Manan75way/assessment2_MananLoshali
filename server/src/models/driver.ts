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
    coordinates: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        index: "2dsphere", // Add an index for GeoJSON support
        default: [0, 0],
      },
    },
    availableRides: [
      {
        startPoint: {
          location: String,
          type: { type: String, default: "Start" },
          coordinates: [Number],
          default: [0, 0],
        },
        endingPoint: {
          location: String,
          type: { type: String, default: "Destination" },
          coordinates: [Number],
          default: [0, 0],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Driver = mongoose.model("drivers", driverSchema);
