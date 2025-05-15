const mongoose = require("mongoose");
const app = require("./app");
const express=require("express");
const dotenv = require("dotenv");
const userRoutes = require('./Routes/userRoutes');
var cors = require('cors')
require('dotenv').config();

const DB = process.env.DATABASE;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connection established");
  });


const port = 3000;

app.use('/signup',userRoutes);

app.listen(port, () => {
  console.log("listening on port 3000");
});
