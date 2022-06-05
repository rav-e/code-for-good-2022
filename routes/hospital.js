// const express = require("express");
const Booking = require("../models/Booking")
const Hospital = require("../models/Hospital")
const Slot = require("../models/Slot")

const sampleHospitals = [
    {
        title: "Laxmi Trust Hospital",
        password: "Pwd1234",
        image: "/images/hospitals/laxmi.jpg",
    }, {
        title: "Sri Ramakrishna Hospital",
        password: "Pwd1234",
        image: "/images/ramakrishanan.jpg"
    }, {
        title: "Dentronix Medisystems",
        password: "Pwd1234",
        image: "/images/hospitals/l-v-pdentronix.jpg"
    }, {
        title: "Manav Kalyan Seva Samiti",
        password: "Pwd1234",
        image: "/images/hospitals/manav.jpg"
    }
]

const saveMockHospitals = async () => {
    await Hospital.deleteMany({})
    await Promise.all(sampleHospitals.map(async (hospital) => {
        // console.log("hosp", hospital)
        const hospitalDoc = new Hospital(hospital)
        console.log("hospdoc", hospitalDoc)
        return await hospitalDoc.save()
    }))
}


const getHospitalData = async (hospitalId) => {
    const hospital = await Hospital.findById(hospitalId).select("-password")
    const bookings = await Booking.find({}).populate("patient").populate("slot")
    const curHospitalSlots = await Slot.find({
        hospital: hospitalId
    })
    const curHospitalBookings = []
    const freeSlotsByType = {

    }
    // console.log("bookings debug", bookings)
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
        title: hospital.title,
        image: hospital.image,
        _id: hospital._id,
        bookedSlotsByType,
        freeSlotsByType,
        bookings: curHospitalBookings
    }
}

const getAllHospitalsData = async () => {
    const hospitals = await Hospital.find({})
    const resp = await Promise.all(hospitals.map((hospital) => {
        return getHospitalData(hospital._id)
    }))
    return resp

}

exports.getAllHospitalsData = getAllHospitalsData
exports.getHospitalData = getHospitalData
exports.saveMockHospitals = saveMockHospitals