const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');
const booksRouter = require('./routes/books');
const { login, logout } = require('./auth');
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://vaibhav:xEin6PCHKLGcodxD@cluster0.jzmkj.mongodb.net/?retryWrites=true&w=majority', function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully connected");
  }
});




app.get("/", function (req, res) {
  res.render('home');
});

app.get("/dashboard", function (req, res) {
  res.render('dashboard');
});


app.get("/logout", logout)
app.post("/login", login)
app.use("/books", booksRouter)
app.listen(3000, function (req, res) {
  console.log("Server running");
});
