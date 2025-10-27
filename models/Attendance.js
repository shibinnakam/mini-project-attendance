import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // ✅ must match the model name in models/Staff.js
      required: true,
    },
    cardUID: {
      type: String,
      required: true,
    },
    checkInTime: {
      type: Date,
    },
    checkOutTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
