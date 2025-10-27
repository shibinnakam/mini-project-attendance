import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cardRoutes from "./routes/cardRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/cards", cardRoutes);
app.use("/api/attendance", attendanceRoutes);

// Pages
app.get("/", (req, res) => res.redirect("/addCard"));
app.get("/addCard", (req, res) => res.render("addCard"));
app.get("/attendance", (req, res) => res.render("attendance"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
