const mongoose = require("mongoose")

const hospitalSchema = new mongoose.Schema({
  title: { type: String },
  password: { type: String },
  image: { type: String }
});

module.exports = mongoose.model("Hospital", hospitalSchema);