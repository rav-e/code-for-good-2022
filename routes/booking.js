const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Slot = require("../models/Slot")
const Patient = require("../models/Patient")


const saveMockBooking = async () => {
      const slots = await Slot.find({})
      const patients = await Patient.find({})

      const booking = new Booking({
        medicalCondition: "Fever",
        symptoms: "high temperature , chills , feeling tired",
        patient: patients[0].id ,
        slot: slots[0]
    });
  
      return await booking.save()
  }

exports.saveMockBooking = saveMockBooking