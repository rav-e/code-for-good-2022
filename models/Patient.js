const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientID: String,
  dob: Date,
  blood_group: String,
  weight: Number,
  height: Number,
  name: String
});

const Patient = mongoose.model("Patient" , patientSchema);

module.exports = Patient