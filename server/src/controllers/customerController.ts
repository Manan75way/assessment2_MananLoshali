import { Request, Response } from "express";
import { Driver } from "../models/driver";

export const findCabs = async (req: Request, res: Response) => {
  const { lat, long } = req.body;

  try {
    const cabs = await Driver.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, long],
          },
          $maxDistance: 1000,
        },
      },
    });
    res.status(200).json({ msg: "Found Cabs Near You", cabs: cabs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const requestRide = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { startCoordinates, destinationCoordinates, lat, long, start, end } =
    req.body;
  console.log(startCoordinates, destinationCoordinates, start, end);

  try {
    const requestRide = await Driver.updateMany(
      {
        coordinates: {
          $geoWithin: {
            $centerSphere: [
              [long, lat], // coordinates of the center point
              1000 / 6371, // radius in kilometers (convert to radians)
            ],
          },
        },
      },
      {
        $set: {
          availableRides: {
            "availableRides.$[element].startPoint.coordinates":
              startCoordinates,
            "availableRides.$[element].endingPoint.coordinates":
              destinationCoordinates,
          },
        },
      }
    );
    res.status(200).json({ msg: "Ride requested successfully", requestRide });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
