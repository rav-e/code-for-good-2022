const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Slot = require("../models/Slot")
const Patient = require("../models/Patient")

const sampleAilments = ["Osteomyelitis", "Diabetes", "Lung Cancer", "Heart Blockage"]
const sampleSymptoms = ["high temperature , chills , feeling tired", "high blood pressure", "high blood sugar", "high fever"]

const getRandomSymptomString = () => {
  const ans = []
  while (ans.length < 3) {
    const symptom = sampleSymptoms[Math.floor(Math.random() * sampleSymptoms.length)];
    if (!ans.includes(symptom)) {
      console.log("symptom", symptom)
      ans.push(symptom)
    }
  }

  return ans.join(",")
}



router.post("/", async (req, res) => {
  const booking = new Booking(req.body)
  await booking.save()
  res.send(booking)
})

router.get("/:bookingId?", async (req, res) => {
  const bookingId = req.params.bookingId
  if (bookingId) {
    return (await Booking.findById(bookingId).populate("patient").populate("slot")).toJSON()
  }
  else {
    return res.status(404).send("Booking not found")
  }
})

const saveMockBooking = async () => {

  const slots = await Slot.find({})
  const patients = await Patient.find({})
  const bookings = []
  console.log("dataset cleaning complete for mock bookings")
  for (let i = 0; i < 60; i++) {
    const booking = new Booking({
      medicalCondition: sampleAilments[Math.floor(Math.random() * sampleAilments.length)],
      symptoms: getRandomSymptomString(),
      patient: patients[Math.floor(Math.random() * patients.length)],
      slot: slots[Math.floor(Math.random() * slots.length)]
    });
    console.log("booking", booking)
    bookings.push(booking.save())
  }
  console.log("bookings generator", bookings)
  await Promise.all(bookings)

}

// (async () => {

//   await saveMockBooking()
// })()
exports.saveMockBooking = saveMockBooking
module.exports = router