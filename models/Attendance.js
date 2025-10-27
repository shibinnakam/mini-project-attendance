import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    cardUID: {
      type: String,
      required: true,
    },
    inTime: {
      type: Date,
      default: Date.now,
    },
    outTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
