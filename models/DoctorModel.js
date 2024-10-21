const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  availability: {
    morning: { type: Boolean, default: false },
    noon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false },
  },
  contact: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
