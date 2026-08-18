import express from "express";
import { verifyToken } from "../Middlewares/Token.js";
import { adminOnly } from "../Middlewares/adminAuth.js";
import {
  getStats,
  getAllUsers,
  getUserDetails,
  blockUser,
  deleteUser,
  getAllJobs,
  getJobDetails,
  updateJob,
  deleteJob,
  getAllApplications,
  getRecentActivity
} from "../Controller/AdminController.js";

const router = express.Router();

router.use(verifyToken, adminOnly);

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserDetails);
router.put("/users/:id/block", blockUser);
router.delete("/users/:id", deleteUser);

router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobDetails);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

router.get("/applications", getAllApplications);
router.get("/recent-activity", getRecentActivity);

export default router;
