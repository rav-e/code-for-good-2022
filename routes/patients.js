const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");


const patient = new Patient({
    patientID: Math.random().toString(36).slice(2),
    dob: new Date(),
    blood_group: "B+",
    weight: 65,
    height: 165,
    name: "Akash"
});

patient.save(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Saved");
    }
});

router.post("/", async (req, res) => { 
    return await Patient.find({});
})

module.exports = router