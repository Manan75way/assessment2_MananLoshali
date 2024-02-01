import { Request, Response } from "express";
import { Driver } from "../models/driver";

export const registerVehcile = async (req: Request, res: Response) => {
  const { vehicleName, vehicleType, vehicleNumber } = req.body;
  const id = req.params.id;

  try {
    if (!vehicleType || !vehicleName || !vehicleNumber) {
      res.status(404).json({ msg: "All fields are required" });
      return;
    }

    if (vehicleNumber.length < 8) {
      res.status(401).json({ msg: "Invalid Number" });
      return;
    }

    const updateVehcile = await Driver.findByIdAndUpdate(id, {
      $set: {
        vehicleName: vehicleName,
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
      },
    });

    res.status(200).json({
      msg: "Vehicle registered successfully",
      updateVehcile: updateVehcile,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const setVehicleStatus = async (req: Request, res: Response) => {
  const { isAvailable, coordinates } = req.body;
  console.log(`isAvailable ${isAvailable} ${coordinates}`);
  const id = req.params.id;

  try {
    const updateVehcile = await Driver.findByIdAndUpdate(id, {
      $set: {
        isAvailable: isAvailable,
      },
    });

    if (isAvailable === "true") {
      const updateVehciles = await Driver.findByIdAndUpdate(id, {
        $set: {
          "coordinates.coordinates": coordinates,
        },
      });
    }

    res.status(200).json({
      msg: "Status set successfully",
      updateVehcile: updateVehcile,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const findRides = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const rides = await Driver.findOne({ _id: id });
    res.status(200).json({ msg: "Found Rides Near You", rides: rides?.availableRides });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
