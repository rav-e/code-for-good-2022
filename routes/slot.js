
const Hospital = require("../models/Hospital")
const Slot = require("../models/Slot")
const slotMockData = require("../slotMockData")


const saveMockSlots = async () => {
  const hospitals = await Hospital.find({})
  await Slot.deleteMany({})

  await Promise.all(slotMockData.map(async row => {
    const slot = new Slot({
      slotType: row.slotType,
      timestamp: new Date(new Date().getTime() + Math.random() * 8600000),
      hospital: hospitals[row.hospital - 1].id
    })

    return await slot.save()
  }
  ))
}

exports.saveMockSlots = saveMockSlots