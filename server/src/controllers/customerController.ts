import { Request, Response } from "express";
import { Driver } from "../models/driver";

export const findCabs = async (req: Request, res: Response) => {
  const { lat, long } = req.body();

  try {
    const fetchCabs = async () => {
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
    };

    const setTimer = setInterval(fetchCabs, 1000);

    setTimeout(() => {
      clearInterval(setTimer);
    }, 1000 * 60 * 10);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const requestRide = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { startCoordinates, destinationCoordinates, lat, long } = req.body;

  try {
    const requestRide = await Driver.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, long],
          },
          $maxDistance: 1000,
        },
      },
    }).updateMany(
      {},
      {
        $set: {
          availableRides: {
            startPoint: {
              coordinates: startCoordinates,
            },
            endingPoint: {
              coordinates: destinationCoordinates,
            },
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
