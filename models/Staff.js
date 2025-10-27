import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    gender: { type: String },
    phone: { type: String },
    address: { type: String },
    pincode: { type: String },
    profilePhoto: { type: String },
    role: { type: String, default: "staff" },
    status: { type: String, default: "pending" },
    isRegistered: { type: Boolean, default: false },
    invitedBy: { type: String },
    dateOfJoining: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Mongoose automatically uses the same collection name "staffs"
export default mongoose.model("Staff", staffSchema);
