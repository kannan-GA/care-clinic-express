// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5005;
// const MONGO_URI = process.env.MONGO_URI; // Replace with your MongoDB connection string

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Doctor Schema
// const doctorSchema = new mongoose.Schema({
//   name: String,
//   specialty: String,
//   availability: {
//     morning: Boolean,
//     noon: Boolean,
//     evening: Boolean,
//   },
//   contact: String,
//   phone: String,
//   date: { type: Date, default: null },
// });

// const Doctor = mongoose.model("Doctor", doctorSchema);

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

// // Routes
// app.get("/doctors", async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching doctors." });
//   }
// });

// app.put("/doctors/:id", async (req, res) => {
//   try {
//     const updatedDoctor = await Doctor.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedDoctor);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating doctor." });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// server.js

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http"); // Import http module
// const { Server } = require("socket.io"); // Import Socket.IO

// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5005;
// const MONGO_URI = process.env.MONGO_URI; // Replace with your MongoDB connection string

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Doctor Schema
// const doctorSchema = new mongoose.Schema({
//   name: String,
//   specialty: String,
//   availability: {
//     morning: Boolean,
//     noon: Boolean,
//     evening: Boolean,
//   },
//   contact: String,
//   phone: String,
//   date: { type: Date, default: null },
// });

// const Doctor = mongoose.model("Doctor", doctorSchema);

// // Create HTTP server
// const server = http.createServer(app);
// const io = new Server(server); // Attach Socket.IO to the server

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

// // Routes
// app.get("/doctors", async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching doctors." });
//   }
// });

// app.put("/doctors/:id", async (req, res) => {
//   try {
//     const updatedDoctor = await Doctor.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     // Notify all connected clients about the update
//     io.emit("doctorUpdated", updatedDoctor);

//     res.json(updatedDoctor);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating doctor." });
//   }
// });

// // Listen for socket connections
// io.on("connection", (socket) => {
//   console.log("A client connected:", socket.id);

//   // Handle socket disconnection
//   socket.on("disconnect", () => {
//     console.log("A client disconnected:", socket.id);
//   });
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5005;
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
    // Emit event on doctor update
    io.emit("doctorUpdated", updatedDoctor); // Emit updated doctor to all connected clients
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor." });
  }
});

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow your front-end origin
    methods: ["GET", "POST"],
    // credentials: true,
  },
});

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: function (origin, callback) {
//       const allowedOrigins = [
//         "http://localhost:5173",
//         "https://care-clinic-demo.netlify.app",
//       ];
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true); // Allow the request
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // You can handle additional socket events here

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
