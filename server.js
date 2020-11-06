const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser');
const User = require("./db/models/User.model");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const isLocal = !(
  process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production"
);
console.log("is Local", isLocal);
const uri = isLocal
  ? "mongodb://localhost:27017/seventh-date"
  : process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Database");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
app.use(cors()); // enable CORS on all requests (https://www.npmjs.com/package/cors)
app.use(express.json())
/**
 * Routes
 */
app.get("/test", function (req, res) {
  console.log("endpoint reached");
  res.json({ message: "Hello World!\n" });
});

app.get("/users", function (req, res) {
  User.find({}, (err, users) =>{
    if(err) console.log(err)
    res.json({ users: users});
  })
});

app.get("/users/:id", function (req, res) {
  User.findById(req.params.id, (err, user) =>{
    if(err) console.log(err)
    res.json(user);
  })
});
app.post("/users", function (req, res) {

  console.log(req.body)
  const {email, firstName, lastName, age, gender, city, password} = req.body;

  const newUser = new User();
  newUser.email = email;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.age = age;
  newUser.gender = gender;
  newUser.city = city;
  newUser.password = newUser.generateHash(password);

  newUser.save().then((user) => {
      res.json({
        success: true,
        message: "Success: User signed up",
        user
      })
  })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        success: false,
        message: `Error: ${err}`,
      })
    });
});
/**
 * Start Server
 */
app.listen(port);
console.log("Express backend listening on port 5000...");
