
const mongoose = require("mongoose");
const slotTypesEnum = ["MRI Scan", "X-Ray", "Dental Checkup", "Ultrasound", "General Consultation"];

const slotSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    slotType: {
        type: String,
        enum: slotTypesEnum,
        required: true
    },
    hospital: { type: 'ObjectId', ref: 'Hospital', required: true }
});



module.exports = mongoose.models.Slot || mongoose.model("Slot", slotSchema)
exports.slotTypesEnum = slotTypesEnum;