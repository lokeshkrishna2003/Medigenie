const mongoose = require("mongoose");
const app = require("./app");
const express=require("express");
const dotenv = require("dotenv");
const helmet=require("helmet");
var cors = require('cors')


dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connection established");
  });



const port = 3000;
app.listen(port, () => {
  console.log("listening on port 3000");
});
