import { Request, Response } from "express";
import { Driver } from "../models/driver";

export const registerVehcile = async (req: Request, res: Response) => {
  const { vehcileName, vehicleType, vehcileNumber } = req.body;
  const id = req.params.id;

  try {
    if (!vehicleType || !vehcileName || !vehcileNumber) {
      res.status(404).json({ msg: "All fields are required" });
      return;
    }

    if (vehcileNumber.length < 8) {
      res.status(401).json({ msg: "Invalid Number" });
      return;
    }

    const updateVehcile = await Driver.findByIdAndUpdate(id, {
      $set: {
        vehcileName: vehcileName,
        vehcileNumber: vehcileName,
        vehcileType: vehicleType,
      },
    });

    res
      .status(200)
      .json({
        msg: "Vehicle registered successfully",
        updateVehcile: updateVehcile,
      });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
