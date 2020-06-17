const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;

const isLocal = !(
    process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production"
  );
console.log("is Local", isLocal);
  const uri = isLocal
    ? "mongodb://localhost:27017/seventh-date"
    : process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }).then(() => {
    console.log("connected to Database")
  }).catch(err => {
    console.log("Error connecting to database: ", err)
  })

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
  app.use(cors()) // enable CORS on all requests (https://www.npmjs.com/package/cors)
/**
 * Routes
 */
app.get('/test', function(req, res) {
    console.log("endpoint reached");
    res.json({message:'Hello World!\n'});
});


app.post('/users', function(req, res) {
    console.log(req.data);
    res.json(req.data);
});
/**
 * Start Server
 */
app.listen(port);
console.log('Express backend listening on port 5000...');
