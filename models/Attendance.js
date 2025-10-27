// models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  cardUID: String,
  date: String,
  inTime: Date,
  outTime: Date,
});

export default mongoose.model("Attendance", attendanceSchema);
