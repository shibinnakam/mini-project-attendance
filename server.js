import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cardRoutes from "./routes/cardRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import Staff from "./models/Staff.js"; // ✅ Import Staff model

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ✅ EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ API routes
app.use("/api/cards", cardRoutes);
app.use("/api/attendance", attendanceRoutes);

// ✅ Redirect root to Add Card
app.get("/", (req, res) => res.redirect("/addCard"));

// ✅ Add Card Page (GET)
app.get("/addCard", async (req, res) => {
  try {
    const staffList = await Staff.find({}, "name email");
    res.render("addCard", { staffList, message: null, error: null });
  } catch (error) {
    console.error("❌ Error fetching staff:", error);
    res.status(500).send("Error fetching staff data");
  }
});

// ✅ Handle Add Card Form Submission (POST)
app.post("/addCard", async (req, res) => {
  try {
    const { staffId, cardUID } = req.body;

    if (!staffId || !cardUID) {
      const staffList = await Staff.find({}, "name email");
      return res.render("addCard", {
        staffList,
        message: null,
        error: "Please select staff and enter Card UID.",
      });
    }

    // Dynamically import Card model to avoid circular import issues
    const { default: Card } = await import("./models/Card.js");

    // Check if card already exists
    const existingCard = await Card.findOne({ cardUID });
    if (existingCard) {
      const staffList = await Staff.find({}, "name email");
      return res.render("addCard", {
        staffList,
        message: null,
        error: "⚠️ Card UID already exists!",
      });
    }

    // Save new card
    const newCard = new Card({ staffId, cardUID });
    await newCard.save();

    const staffList = await Staff.find({}, "name email");
    res.render("addCard", {
      staffList,
      message: "✅ Card added successfully!",
      error: null,
    });
  } catch (error) {
    console.error("❌ Error adding card:", error);
    const staffList = await Staff.find({}, "name email");
    res.render("addCard", {
      staffList,
      message: null,
      error: "❌ Failed to add card. Please try again.",
    });
  }
});

// ✅ Attendance Page
app.get("/attendance", async (req, res) => {
  try {
    const { default: Attendance } = await import("./models/Attendance.js");
    const attendanceRecords = await Attendance.find()
      .populate("staffId", "name email")
      .sort({ createdAt: -1 });

    res.render("attendance", { attendanceRecords });
  } catch (error) {
    console.error("❌ Error loading attendance:", error);
    res.status(500).send("Error loading attendance data");
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
