// models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // 👈 This must match the model name in Staff.js
      required: true,
    },
    cardUID: {
      type: String,
      required: true,
    },
    date: {
      type: String, // Example: "2025-10-27"
      required: true,
    },
    inTime: {
      type: Date,
    },
    outTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
