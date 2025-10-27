import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// 🟢 View attendance page
router.get("/", async (req, res) => {
  try {
    const attendanceData = await Attendance.find()
      .populate("staff", "name email phone")
      .sort({ inTime: -1 });

    res.render("attendance", { attendanceData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading attendance data");
  }
});

export default router;
