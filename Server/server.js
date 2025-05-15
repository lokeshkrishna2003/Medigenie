const mongoose = require("mongoose");
const app = require("./app");
const express=require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const userRoutes = require('./Routes/userRoutes');
const cors = require('cors')
const fs = require('fs')
const Audio = require('./Models/Audio');
require('dotenv').config();

const DB = process.env.DATABASE;

app.use(cors());
app.use(express.json());

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connection established");
 });


const port = 3000;

app.use('/signup',userRoutes);
app.use('/sendMessage',userRoutes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `audio_${Date.now()}.webm`);
  }
});

const upload = multer({storage});

app.post("/upload-audio", upload.single("audio"), (req, res) => {
  console.log("Audio received:", req.file.filename);
  res.json({ message: "Audio saved successfully", file: req.file.filename });
});

app.listen(port, () => {
  console.log("listening on port 3000");
});
