
const mongoose = require("mongoose");
const slotTypesEnum = ["MRI Scan", "X-Ray", "Dental Checkup", "Ultrasound", "General Consultation"];

const slotSchema = new mongoose.Schema({
    timestamp: Date,
    slotType: {
        type: String,
        enum: slotTypesEnum,
    },
    hospital: { type: 'ObjectId', ref: 'Hospital' }
});



module.exports = mongoose.models.Slot || mongoose.model("Slot", slotSchema)
exports.slotTypesEnum = slotTypesEnum;