import express from "express";
import {
  changePassword,
  deleteUser,
  getMyProfile,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/register",isAuthenticated, isAuthorized("admin"), register);
router.put("/user/:id", isAuthenticated, isAuthorized("admin"), updateUser);
router.delete("/user/:id", isAuthenticated, isAuthorized("admin"), deleteUser);
router.get("/me", isAuthenticated, getMyProfile);

router.put(
  "/user/:id/change-password",
  isAuthenticated,
  isAuthorized("admin"),
  changePassword
);

export default router;
