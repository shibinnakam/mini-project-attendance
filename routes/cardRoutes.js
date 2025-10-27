import express from "express";
import Card from "../models/Card.js";
import Staff from "../models/Staff.js";

const router = express.Router();

// 🟢 Render "Add Card" page
router.get("/", async (req, res) => {
  try {
    const staffList = await Staff.find({}, "name email");
    res.render("addCard", { staffList, message: null });
  } catch (error) {
    res.status(500).send("Error loading staff list");
  }
});

// 🟢 Save new card UID for a staff
router.post("/add", async (req, res) => {
  try {
    const { staffId, cardUID } = req.body;

    if (!staffId || !cardUID) {
      return res.status(400).send("All fields required");
    }

    const existingCard = await Card.findOne({ cardUID });
    if (existingCard) {
      const staffList = await Staff.find({}, "name email");
      return res.render("addCard", { staffList, message: "❌ Card UID already assigned!" });
    }

    const card = new Card({ staff: staffId, cardUID });
    await card.save();

    const staffList = await Staff.find({}, "name email");
    res.render("addCard", { staffList, message: "✅ Card assigned successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
