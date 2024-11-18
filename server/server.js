const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    console.log(`Uploading file: ${file.originalname}`);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Received a file upload request');
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log('File uploaded successfully:', req.file);
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error handling middleware:', err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://192.168.29.96:${PORT}`);
});
