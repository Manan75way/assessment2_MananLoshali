import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  const JWT_SEC: string = process.env.JWT_SEC || "secretkey";

  if (!token) {
    res.status(401).json({ msg: "Token not provided" });
    return;
  }

  jwt.verify(token, JWT_SEC, async (err: any, data: any) => {
    if (err) {
      res.status(403).json({ msg: "Unauthorized" });
      return;
    } else {
      console.log(data);
      req.driver = data;
      next();
    }
  });
};

export const verifyTokenAndAutherization = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    console.log(req.params.id);
    console.log(req.driver._id);
    if (req.driver._id !== req.params.id) {
      res.status(402).json({ msg: "You are not allowed" });
      return;
    } else {
      next();
    }
  });
};
