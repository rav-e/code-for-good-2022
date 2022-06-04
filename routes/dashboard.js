const express = require("express")
const dashboardRouter = express.Router()
const serviceTypes = require("../constants/serviceTypes")
const { getAllHospitalsData } = require("../routes/hospital")
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

module.exports = dashboardRouter