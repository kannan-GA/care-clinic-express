// functions/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();
const MONGO_URI = process.env.MONGO_URI; // Replace with your MongoDB connection string

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  availability: {
    morning: Boolean,
    noon: Boolean,
    evening: Boolean,
  },
  contact: String,
  phone: String,
  date: { type: Date, default: null },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

app.get("/", (req, res) => {
  res.send("Welcome");
});

// Routes
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors." });
  }
});

app.put("/doctors/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor." });
  }
});

// Export as a serverless function
module.exports.handler = serverless(app);
