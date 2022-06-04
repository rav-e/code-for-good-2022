
const monoogse = require("mongoose");
const slotSchema = new mongoose.Schema({
  medicalCondition: String,
  type: String,
  date: Date,
  hospital: {type :"ObjectId", ref:"Hospital"}
});

const Slot = mongoose.model(slotSchema)

module.exports = Slot