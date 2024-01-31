import express from "express";
import { verifyTokenAndAutherization } from "../middleware/verifyToken";
import { registerVehcile } from "../controllers/driverController";

const router = express.Router();

router.put("/:id", verifyTokenAndAutherization, registerVehcile);

export default router;
