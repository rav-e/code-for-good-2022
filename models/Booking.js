
const monoogse = require("mongoose");
const bookingSchema = new mongoose.Schema({
  medicalCondition: String,
    symptoms: String,
    patient: { type: 'ObjectId', ref: 'Patient' },
    slot: {type :"ObjectId", ref:"Slot"}
});

const Booking = mongoose.model(bookingSchema)

module.exports = Booking