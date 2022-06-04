const mongoose = require("mongoose")

const hospitalSchema = new mongoose.Schema({
  title: { type: String },
  password: { type: String }
});

module.exports = mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema);