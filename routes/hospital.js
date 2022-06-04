// const express = require("express");
const Booking = require("../models/Booking")
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
    await Hospital.deleteMany({})
    await Promise.all(sampleHospitals.map(async (hospital) => {
        console.log("hosp", hospital)
        const hospitalDoc = new Hospital(hospital)
        console.log("hospdoc", hospitalDoc)
        return await hospitalDoc.save()
    }))
}

const getAllHospitalsData = async () => {
    const hospitals = await Hospital.find({}).select("-password")
    const slots = await Slot.find({})
    const bookings = await Booking.find({})

    let resp = []

    hospitals.forEach((hospital) => {

        // console.log("slots", slots)
        const curHospitalSlots = slots.filter((slot) => slot.hospital.equals(hospital.id))

        const freeSlotsByType = {

        }

        const bookedSlotsByType = {
        }

        curHospitalSlots.forEach((slot) => {
            if (!freeSlotsByType[slot.slotType]) {
                freeSlotsByType[slot.slotType] = []
            }
            if (!bookedSlotsByType[slot.slotType]) {
                bookedSlotsByType[slot.slotType] = []
            }

            const relevantBooking = bookings.find((booking) => booking.slot.equals(slot.id))
            if (!relevantBooking) {
                freeSlotsByType[slot.slotType].push(slot)
            }
            else {
                bookedSlotsByType[slot.slotType].push(slot)
            }
        })

        resp.push({
            ...hospital.toJSON(),
            slots: curHospitalSlots.map((slot) => slot.toJSON()),
            freeSlotsByType
        })

    })
    console.log("hospitals data", resp)
    return resp
}
// router.get("/", async (req, res) => { 
//     return await Hospital.find({});
// })

exports.getAllHospitalsData = getAllHospitalsData
exports.saveMockHospitals = saveMockHospitals