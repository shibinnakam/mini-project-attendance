// models/Card.js
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // ✅ This must match your Staff model name
      required: true,
    },
    cardUID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
