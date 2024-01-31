import { Request, Response } from "express";
import { isEmail, isPassword } from "../helper/validation";
import bcrypt from "bcryptjs";
import { Customer } from "../models/customer";
import jwt from "jsonwebtoken";

//Register a new Customer

export const customerRegister = async (req: Request, res: Response) => {
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

    const newCustomer = new Customer({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedCustomer = await newCustomer.save();
    res
      .status(200)
      .json({ msg: "Customer created successfully", users: savedCustomer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

//Login a Customer

export const customerLogin = async (req: Request, res: Response) => {
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

    const fetchedCustomer = await Customer.findOne({ email: email });

    if (!fetchedCustomer) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, fetchedCustomer.password);

    if (!isMatch) {
      res.status(404).json({ msg: "Incorrect password" });
      return;
    }

    const jwtToken = jwt.sign({ _id: fetchedCustomer._id }, JWT_SEC, {
      expiresIn: "1d",
    });
    res.status(200).json({
      msg: "Customer loggedin successfully",
      users: fetchedCustomer,
      token: jwtToken,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
