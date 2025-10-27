import express from "express";
import Attendance from "../models/Attendance.js";
import Card from "../models/Card.js";
import Staff from "../models/Staff.js";

const router = express.Router();

// 🟢 1️⃣ Web Dashboard View
router.get("/", async (req, res) => {
  try {
    const attendanceData = await Attendance.find()
      .populate("staff", "name email phone")
      .sort({ inTime: -1 });

    res.render("attendance", { attendanceData });
  } catch (error) {
    console.error("❌ Error loading attendance data:", error);
    res.status(500).send("Error loading attendance data");
  }
});

// 🟢 2️⃣ RFID Device Endpoint (ESP32)
router.post("/mark", async (req, res) => {
  try {
    const { cardUID } = req.body;
    if (!cardUID) return res.status(400).json({ error: "cardUID required" });

    console.log("📡 Received RFID UID:", cardUID);

    // Find card in DB
    const card = await Card.findOne({ cardUID }).populate("staffId");
    if (!card) {
      console.log("❌ Card not found in DB!");
      return res.status(404).json({ error: "Card not registered" });
    }

    const staff = card.staffId;
    const today = new Date().toISOString().split("T")[0];

    // Check if already has attendance record for today
    let record = await Attendance.findOne({
      staff: staff._id,
      date: today,
    });

    if (!record) {
      // 🕒 Mark IN
      record = new Attendance({
        staff: staff._id,
        cardUID,
        date: today,
        inTime: new Date(),
      });
      await record.save();

      console.log(`🟢 IN marked for ${staff.name}`);
      return res.json({ status: "intime", staff: staff.name });
    } else if (!record.outTime) {
      // 🕓 Mark OUT
      record.outTime = new Date();
      await record.save();

      console.log(`🔵 OUT marked for ${staff.name}`);
      return res.json({ status: "outtime", staff: staff.name });
    } else {
      console.log(`⚠️ Already marked for ${staff.name}`);
      return res.json({ status: "alreadyMarked", staff: staff.name });
    }
  } catch (error) {
    console.error("❌ Attendance mark error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
