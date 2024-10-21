const mongoose = require("mongoose");
const Doctor = require("../models/DoctorModel"); // Adjust path if needed

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const doctors = [
  {
    name: "Dr. John Smith",
    specialty: "Cardiologist",
    availability: { morning: true, noon: false, evening: true },
    contact: "john.smith@example.com",
    phone: "123-456-7890",
  },
  {
    name: "Dr. Jane Doe",
    specialty: "Dermatologist",
    availability: { morning: true, noon: true, evening: false },
    contact: "jane.doe@example.com",
    phone: "234-567-8901",
  },
];

// Insert data into the database
Doctor.insertMany(doctors)
  .then(() => {
    console.log("Doctors added successfully");
    mongoose.connection.close(); // Close the connection after insertion
  })
  .catch((error) => {
    console.error("Error adding doctors:", error);
  });
