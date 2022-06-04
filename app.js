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

const { saveMockBooking } = require("./routes/booking");
const { saveMockPatient } = require("./routes/patients");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');




app.get("/", async (req, res) => {
  res.render('home', {
    hospitals: await getAllHospitalsData()
  });
});

app.use("/dashboard", dashboardRouter);


app.get("/logout", logout)
app.post("/login", login)
app.use("/books", booksRouter)


mongoose.connect('mongodb+srv://vaibhav:xEin6PCHKLGcodxD@cluster0.jzmkj.mongodb.net/test?retryWrites=true&w=majority', async function (err) {
  await Hospital.init()
  await Slot.init()
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully connected");
    app.listen(3000, async function (req, res) {
      // await saveMockHospitals()
      // await saveMockSlots()
      // await saveMockPatient()
      // await saveMockBooking()
      console.log("Server running");
    });
  }
});

