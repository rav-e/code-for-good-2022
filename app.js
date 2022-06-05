const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');
const booksRouter = require('./routes/books');
const { getAllHospitalsData, saveMockHospitals } = require("./routes/hospital")
const { saveMockSlots } = require("./routes/slot")
const { login, logout } = require('./auth');
const Hospital = require('./models/Hospital');
const Slot = require('./models/Slot');
const dashboardRouter = require("./routes/dashboard")
const patientRouter = require("./routes/patients")
const { saveMockPatient } = require("./routes/patients");
const serviceTypes = require("./constants/serviceTypes")
const bookingRouter = require("./routes/booking");
const Booking = require('./models/Booking');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

const mongoCred = require("./cred")


app.get("/slot-info", async (req, res) => {
  return res.json({ hospitalsData: await getAllHospitalsData(), serviceTypes: serviceTypes })
})
app.get("/", async (req, res) => {
  res.render('home');
});

app.get("/team", (req, res) => {
  const teamPeople = [{
    name: "Mansi Patil",
    image: "/images/team/mansi.jpg"
  }, {
    name: "Shaik Reehana",
    image: "/images/team/reehana.jpeg"
  }, {
    name: "Aashritha Nelavelli",
    image: "/images/team/aashrita.JPG"
  }, {
    name: "CH. Monica Chowdary",
    image: "/images/team/monica.jpg"
  }, {
    name: "Raviranjan Prasad",
    image: "/images/team/ravi.jpg"
  }, {
    name: "Vaibhav Chopra",
    image: "/images/team/vaibhav.jpg",
  }, {
    name: "Akash P",
    image: "/images/team/akash.jpg",
  },]

  return res.json(teamPeople);

})

app.use("/dashboard", dashboardRouter);


app.get("/logout", logout)
app.get("/booking-success/:bookingId", async (req, res) => {
  const booking = await (Booking.findById(req.params.bookingId).populate("slot"))
  console.log("this booking", booking)
  res.render("booking-success", {
    slot: booking.slot
  })
})
app.post("/login", login)
app.use("/books", booksRouter)
app.use("/patient", patientRouter)
app.use("/booking", bookingRouter)

mongoose.connect(mongoCred, async function (err) {
  await Hospital.init()
  await Slot.init()
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully connected");
    app.listen(3000, async function (req, res) {
      // await saveMockHospitals()
      // await saveMockSlots()
      // await saveMockBooking()
      // await saveMockPatient()
      console.log("Server running");
    });
  }
});

