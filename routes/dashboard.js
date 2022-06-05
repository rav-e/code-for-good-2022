const express = require("express")
const dashboardRouter = express.Router()
const Slot = require("../models/Slot")
const serviceTypes = require("../constants/serviceTypes")
const { getAllHospitalsData, getHospitalData } = require("../routes/hospital")
dashboardRouter.get("/", async function (req, res) {

    res.render('dashboard');
})

dashboardRouter.get("/stats", async (req, res) => {
    const data = {
        hospitals: JSON.stringify(await getAllHospitalsData()),
        serviceTypes: serviceTypes
    }
    return res.json(data)
})

dashboardRouter.post("/add-slot", async (req, res) => {
    console.log("reqBody", req.body)
    const slot = new Slot(req.body)

    await slot.save()
    console.log("slot saved", slot)
    return res.json(slot)
})

dashboardRouter.get("/hospital-stats/:hospitalId?", async (req, res) => {
    let hospitalId = req.params.hospitalId || "629c10d2c20fce86421651b0"
    const data = await getHospitalData(hospitalId)
    return res.json({ ...data, serviceTypes })
})

module.exports = dashboardRouter