// const express = require("express");
const Hospital = require("../models/Hospital")
const Slot = require("../models/Slot")

const sampleHospitals = [
    {
        title: "Laxmi Trust Hospital",
        password: "Pwd1234"
    }, {
        title: "Sri Ramakrishna Hospital",
        password: "Pwd1234",
    }, {
        title: "Dentronix Medisystems",
        password: "Pwd1234"
    }, {
        title: "Manav Kalyan Seva Samiti",
        password: "Pwd1234"
    }
]

const saveMockHospitals = async () => {
    // await Hospital.deleteMany({})
    await Promise.all(sampleHospitals.map(async (hospital) => {
        console.log("hosp", hospital)
        const hospitalDoc = new Hospital(hospital)
        console.log("hospdoc", hospitalDoc)
        return await hospitalDoc.save()
    }))
}

const getHospitalsData = async () => {
    const hospitals = await Hospital.find({})
    const slots = await Slot.find({})

    let resp = []

    hospitals.forEach((hospital) => {

        const curHospitalSlots = slots.filter((slot) => slot.hospital == hospital.id)

        resp.push({
            ...hospital,
            slots: curHospitalSlots
        })
    })
    console.log("hospitals data", resp)
    return resp
}
// router.get("/", async (req, res) => { 
//     return await Hospital.find({});
// })

exports.getHospitalsData = getHospitalsData
exports.saveMockHospitals = saveMockHospitals