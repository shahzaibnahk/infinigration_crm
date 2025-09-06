import express from "express";
import {
  changePassword,
  deleteUser,
  getActivityLogs,
  getAllUsers,
  getMyAttendance,
  getMyProfile,
  getUserById,
  login,
  logout,
  markAttendance,
  register,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/register", register);
router.get("/users", isAuthenticated, isAuthorized("admin"), getAllUsers);
router.put(
  "/user/:id",
  isAuthenticated,
  isAuthorized("admin"),
  singleUpload,
  updateUser
);
router.get("/user/:id", isAuthenticated, getUserById);
router.delete("/user/:id", isAuthenticated, isAuthorized("admin"), deleteUser);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/my-attendance", isAuthenticated, getMyAttendance);
router.get("/my-logs", isAuthenticated, getActivityLogs);
router.put("/mark-attendance/:id", isAuthenticated, markAttendance);

router.put(
  "/user/:id/change-password",
  isAuthenticated,
  isAuthorized("admin"),
  changePassword
);

export default router;
