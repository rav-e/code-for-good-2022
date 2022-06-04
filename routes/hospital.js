const express = require("express");
const router = express.Router()
const Hospital = require("../models/Hospital")

const getHospitalsData = async () => { 
    const hospitals = await Hospital.find({})
    const slots = await Slots.find({})

    let resp = []

    hospitals.forEach((hospital) => { 
        
        const curHospitalSlots = slots.filter((slot) => slot.hospital == hospital.id)
        
        resp.push({
            ...hospital,
            slots : curHospitalSlots
        })
    })

    return resp
}
// router.get("/", async (req, res) => { 
//     return await Hospital.find({});
// })

module.exports = router