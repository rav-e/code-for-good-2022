const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const aarogyasri = require("./disease-lists/aarogyasri")
const notIncluded = require("./disease-lists/notIncluded")

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


router.get("/diseases-symptoms", async (req, res) => {
    return res.json({
        aarogyasri: Array.from(aarogyasri),
        notIncluded: Array.from(notIncluded)
    })
})
router.get("/:patientId", async (req, res) => {
    console.log("patient id", req.params)
    const patient = await Patient.findOne({ parentId: req.params.patientId });
    console.log("patient", patient);
    if (patient) {
        return res.json(patient.toJSON());
    }
    else {
        return res.status(404).send("Patient not found");
    }
})

exports.saveMockPatient = saveMockPatient
module.exports = router