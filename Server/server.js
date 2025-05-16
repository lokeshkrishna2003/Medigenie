const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const stream = require('stream');
const { GridFSBucket, ObjectId } = require('mongodb');
const userRoutes = require('./Routes/userRoutes');
const AudioUpload = require('./Models/AudioUpload');
const fs = require('fs');
// const { ObjectId } = require('mongodb');
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
  
  // Upload audio endpoint
  app.post('/upload-audio', upload.single('audio'), (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  
      const { name, email } = req.body;
      if (!name || !email) return res.status(400).json({ message: 'Name and Email required' });
  
      const filename = `audio_${Date.now()}.webm`;
  
      // Save audio buffer to GridFS
      const readableStream = new stream.Readable();
      readableStream.push(req.file.buffer);
      readableStream.push(null);
  
      const uploadStream = gfsBucket.openUploadStream(filename, {
        contentType: 'audio/webm',
        metadata: { name, email }
      });
  
      readableStream.pipe(uploadStream)
        .on('error', (err) => {
          console.error('Error uploading to GridFS:', err);
          return res.status(500).json({ message: 'GridFS upload error' });
        })
        .on('finish', () => {
          console.log(`Saved audio to GridFS with ID: ${uploadStream.id}`);
          return res.status(200).json({
            message: 'Audio uploaded successfully',
            fileId: uploadStream.id.toString()
          });
        });
  
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
 // List all audios with metadata - adjusted
 app.get('/audios', async (req, res) => {
  console.log('Received request to /audios');

  try {
    const filesCol = mongoose.connection.db.collection('audioFiles.files');
    const files = await filesCol.find({}).toArray();
    console.log('Files retrieved:', files.length);

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No audios found' });
    }

    const audios = files.map(file => ({
      id: file._id.toString(),
      filename: file.filename,
      name: file.metadata?.name || 'Unknown',
      email: file.metadata?.email || 'Unknown',
      uploadDate: file.uploadDate,
      contentType: file.contentType
    }));

    return res.status(200).json(audios);
  } catch (err) {
    console.error('Error fetching audios:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});




app.get('/audio/:id', async (req, res) => {
  const idstr = req.params.id;

  // Validate id before creating ObjectId
  if (!ObjectId.isValid(idstr) || (String)(new ObjectId(idstr)) !== idstr) {
    return res.status(400).json({ message: 'Invalid audio ID' });
  }

  const fileId = new ObjectId(idstr);

  try {
    const files = await gfsBucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'Audio not found' });
    }
    const file = files[0];

    const range = req.headers.range;
    const fileSize = file.length;
    const contentType = file.contentType || 'audio/mpeg';

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
      }

      const chunkSize = end - start + 1;

      res.status(206);
      res.set({
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
      });

      const downloadStream = gfsBucket.openDownloadStream(fileId, { start, end: end + 1 });
      downloadStream.pipe(res);

      downloadStream.on('error', (err) => {
        console.error('Error streaming audio with range:', err);
        res.status(500).end();
      });

    } else {
      res.status(200);
      res.set({
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
      });

      const downloadStream = gfsBucket.openDownloadStream(fileId);
      downloadStream.pipe(res);

      downloadStream.on('error', (err) => {
        console.error('Error streaming audio:', err);
        res.status(500).end();
      });
    }
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).json({ message: 'Error streaming audio' });
  }
});




app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});