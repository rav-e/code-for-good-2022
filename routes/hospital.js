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


const getHospitalData = async (hospitalId) => {
    const slots = await Slot.find({})
    const bookings = await Booking.find({}).populate("patient").populate("slot")
    const hospital = await Hospital.findOne({ id: hospitalId }).select("-password")
    const curHospitalSlots = slots.filter((slot) => slot.hospital.equals(hospital.id))
    const curHospitalBookings = []
    const freeSlotsByType = {

    }
    console.log("bookings debug", bookings)
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
            curHospitalBookings.push(relevantBooking)
        }
    })

    return {
        ...hospital.toJSON(),
        bookedSlotsByType,
        freeSlotsByType,
        bookings: curHospitalBookings
    }
}

const getAllHospitalsData = async () => {
    const hospitals = await Hospital.find({})
    const resp = await Promise.all(hospitals.map((hospital) => {
        return getHospitalData(hospital.id)
    }))
    // console.log("hospitals data", resp)
    return resp
}

// router.get("/", async (req, res) => { 
//     return await Hospital.find({});
// })

exports.getAllHospitalsData = getAllHospitalsData
exports.getHospitalData = getHospitalData
exports.saveMockHospitals = saveMockHospitals