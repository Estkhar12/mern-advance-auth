import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verfyEmail,
} from "../controllers/auth.controller.js";
import { verify_token } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verify_token, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verfyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
