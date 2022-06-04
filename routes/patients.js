const express = require("express");
const router = express.Router()
const Patient = require("../models/Patient")

router.post("/", (req, res) => { 
    return await Patient.find({});
})

module.exports = router