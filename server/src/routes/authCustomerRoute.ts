import express from "express";

import {
  customerLogin,
  customerRegister,
} from "../controllers/customerauthController";

const router = express.Router();

//Customer register
router.post("/register", customerRegister);

//Customer login
router.post("/login", customerLogin);

export default router;
