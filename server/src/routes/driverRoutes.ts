import express from "express";
import { verifyTokenAndAutherization } from "../middleware/verifyToken";
import { registerVehcile, setVehicleStatus } from "../controllers/driverController";

const router = express.Router();

router.put("/:id", verifyTokenAndAutherization, registerVehcile);
router.put("/setstatus/:id",verifyTokenAndAutherization,setVehicleStatus)

export default router;
