const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

const saveMockPatient = async () => {
    //await Patient.deleteMany({})
    const patient = new Patient({
        patientID: Math.random().toString(36).slice(2),
        dob: new Date(),
        blood_group: "B+",
        weight: 65,
        height: 165,
        name: "Akash"
    });
    return await patient.save()
}


router.post("/", async (req, res) => { 
    return await Patient.find({});
})

exports.saveMockPatient = saveMockPatient