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
    vehcileName: {
      type: String,
    },
    vehcileType: {
      type: String,
      enum: ["two Wheeler", "four wheeler"],
    },
    vehcileNumber: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      enum: [true, false],
    },
    rideStatus:{
        type:String,
        enum:['start','finish','cancel'],
    }
  },
  { timestamps: true }
);

export const Driver = mongoose.model("drivers", driverSchema);
