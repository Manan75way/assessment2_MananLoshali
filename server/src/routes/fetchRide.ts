import express from "express";
import { verifyTokenAndAutherization } from "../middleware/verifyToken";
import { findRides } from "../controllers/driverController";

const router = express.Router();

router.get("/:id", verifyTokenAndAutherization, findRides);

export default router;
