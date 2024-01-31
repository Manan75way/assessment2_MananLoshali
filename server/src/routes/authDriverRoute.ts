import express from "express";
import {
  driverLogin,
  driverRegister,
} from "../controllers/driverauthController";
import {
  customerLogin,
  customerRegister,
} from "../controllers/customerauthController";

const router = express.Router();

//Driver register
router.post("/register", driverRegister);

//Driver login
router.post("/login", driverLogin);

//Customer register
router.post("/register", customerRegister);

//Customer login
router.post("/login", customerLogin);

export default router;
