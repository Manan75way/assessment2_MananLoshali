import express from "express";
import { findCabs, requestRide } from "../controllers/customerController";
import { verifyTokenAndAutherization } from "../middleware/verifyToken";

const router = express.Router();

router.post("/find/:id", verifyTokenAndAutherization, findCabs);

router.post("/requestride/:id",verifyTokenAndAutherization,requestRide);

export default router;
