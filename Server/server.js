const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const stream = require('stream');
const { GridFSBucket, ObjectId } = require('mongodb');
const userRoutes = require('./Routes/userRoutes');
const AudioUpload = require('./Models/AudioUpload');
const fs = require('fs');
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

// app.post('/upload-audio', upload.single('audio'), (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const filename = `audio_${Date.now()}.webm`;
//     const uploadsDir = './uploads';

//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir);
//     }

//     const localPath = `${uploadsDir}/${filename}`;
//     fs.writeFileSync(localPath, req.file.buffer);
//     console.log(`Saved audio locally at: ${localPath}`);

//     const readableStream = new stream.Readable();
//     readableStream.push(req.file.buffer);
//     readableStream.push(null);

//     const uploadStream = gfsBucket.openUploadStream(filename, { contentType: 'audio/webm' });

//     readableStream.pipe(uploadStream)
//       .on('error', (err) => {
//         console.error('Error uploading to GridFS:', err);
//         return res.status(500).json({ message: 'GridFS upload error' });
//       })
//       .on('finish', () => {
//         console.log(`Saved audio to GridFS with ID: ${uploadStream.id}`);
//         return res.status(200).json({
//           message: 'Audio uploaded successfully',
//           fileId: uploadStream.id,
//           localPath,
//         });
//       });

//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// app.get('/audio/:id', (req, res) => {
//   try {
//     const fileId = new ObjectId(req.params.id);

//     gfsBucket.find({ _id: fileId }).toArray((err, files) => {
//       if (err) {
//         console.error('Error finding file:', err);
//         return res.status(500).json({ message: 'Error finding audio' });
//       }
//       if (!files || files.length === 0) {
//         return res.status(404).json({ message: 'Audio not found' });
//       }

//       res.set('Content-Type', files[0].contentType);
//       const downloadStream = gfsBucket.openDownloadStream(fileId);
//       downloadStream.pipe(res);
//     });
//   } catch (error) {
//     console.error('Streaming error:', error);
//     res.status(500).json({ message: 'Error streaming audio' });
//   }
// });

app.post('/upload-audio', upload.single('audio'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and Email required' });

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

    const uploadStream = gfsBucket.openUploadStream(filename, {
      contentType: 'audio/webm',
      metadata: { name, email },  // ✅ added here
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

      downloadStream.on('error', (err) => {
        console.error('Error streaming audio:', err);
        res.status(500).end();
      });
    });
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).json({ message: 'Error streaming audio' });
  }
});

app.get('/audios', (req, res) => {
  try {
    gfsBucket.find().toArray((err, files) => {
      if (err) {
        console.error('Error fetching files:', err);
        return res.status(500).json({ message: 'Error fetching audios' });
      }
      if (!files || files.length === 0) {
        return res.status(404).json({ message: 'No audios found' });
      }
      const audios = files.map(file => ({
        id: file._id,
        filename: file.filename,
        name: file.metadata?.name || 'Unknown',
        email: file.metadata?.email || 'Unknown',
        uploadDate: file.uploadDate,
        contentType: file.contentType,
      }));

      res.status(200).json(audios);
    });
  } catch (error) {
    console.error('Error fetching audios:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});