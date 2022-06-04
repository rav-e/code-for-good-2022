
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  medicalCondition: String,
  symptoms: String,
  patient: { type: 'ObjectId', ref: 'Patient' },
  slot: { type: "ObjectId", ref: "Slot", unique: true }
});

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking