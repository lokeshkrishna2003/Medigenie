const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const stream = require('stream');
const { GridFSBucket, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

const PORT = 3000;
const DB = process.env.DATABASE;

app.use(cors());
app.use(express.json());


mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

let gfsBucket;

mongoose.connection.once('open', () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'audioFiles' });
  console.log('GridFS bucket initialized');
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload-audio', upload.single('audio'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filename = `audio_${Date.now()}.webm`;
    const uploadsDir = './uploads';

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const localPath = `${uploadsDir}/${filename}`;
    fs.writeFileSync(localPath, req.file.buffer);
    console.log(`Saved audio locally at: ${localPath}`);

    const readableStream = new stream.Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = gfsBucket.openUploadStream(filename, { contentType: 'audio/webm' });

    readableStream.pipe(uploadStream)
      .on('error', (err) => {
        console.error('Error uploading to GridFS:', err);
        return res.status(500).json({ message: 'GridFS upload error' });
      })
      .on('finish', () => {
        console.log(`Saved audio to GridFS with ID: ${uploadStream.id}`);
        return res.status(200).json({
          message: 'Audio uploaded successfully',
          fileId: uploadStream.id,
          localPath,
        });
      });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/audio/:id', (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);

    gfsBucket.find({ _id: fileId }).toArray((err, files) => {
      if (err) {
        console.error('Error finding file:', err);
        return res.status(500).json({ message: 'Error finding audio' });
      }
      if (!files || files.length === 0) {
        return res.status(404).json({ message: 'Audio not found' });
      }

      res.set('Content-Type', files[0].contentType);
      const downloadStream = gfsBucket.openDownloadStream(fileId);
      downloadStream.pipe(res);
    });
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).json({ message: 'Error streaming audio' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});