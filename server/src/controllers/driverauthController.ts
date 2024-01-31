import { Request, Response } from "express";
import { isEmail, isPassword } from "../helper/validation";
import bcrypt from "bcryptjs";
import { Driver } from "../models/driver";
import jwt from "jsonwebtoken";

//Register a new Driver
export const driverRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !password || !username) {
      res.status(404).json({ msg: "All fields are required" });
      return;
    }
    if (username.length <= 2) {
      res.status(404).json({ msg: "Invalid username" });
      return;
    }
    if (!isEmail(email)) {
      res.status(400).json({ msg: "Invalid email" });
      return;
    }
    if (!isPassword(password)) {
      res.status(400).json({ msg: "Invalid password" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const newDriver = new Driver({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedDriver = await newDriver.save();
    res
      .status(200)
      .json({ msg: "Driver created successfully", users: savedDriver });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

//Login a Driver

export const driverLogin = async (req: Request, res: Response) => {
  const JWT_SEC: string = process.env.JWT_SEC || "secretkey";

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(404).json({ msg: "All fields are required" });
      return;
    }
    if (!isEmail(email)) {
      res.status(400).json({ msg: "Invalid email" });
      return;
    }
    if (!isPassword(password)) {
      res.status(400).json({ msg: "Invalid password" });
      return;
    }

    const fetchedDriver = await Driver.findOne({ email: email });

    if (!fetchedDriver) {
      res.status(404).json({ msg: "Driver not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, fetchedDriver.password);

    if (!isMatch) {
      res.status(404).json({ msg: "Incorrect password" });
      return;
    }

    const jwtToken = jwt.sign({ _id: fetchedDriver._id }, JWT_SEC, {
      expiresIn: "1d",
    });
    res.status(200).json({
      msg: "Driver loggedin successfully",
      users: fetchedDriver,
      token: jwtToken,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
