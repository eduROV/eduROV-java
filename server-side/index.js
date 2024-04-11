// Import necessary modules
const express = require('express');
const { VideoCapture } = require('libvideo');

// Create an Express application
const app = express();
const port = 3000;

// Initialize video capture
const video = new VideoCapture(0); // 0 is usually the default camera
video.setFormat(640, 480); // Set the desired format, width x height

// Route for accessing the video stream
app.get('/video-stream', (req, res) => {
  res.connection.setTimeout(0); // Set timeout to zero for a continuous stream
  console.log('Stream Connected');

  // Function to capture and send video frames
  const sendFrame = () => {
    try {
      const frame = video.read();
      res.write(frame);
      setImmediate(sendFrame);
    } catch (err) {
      console.error('Error capturing video frame:', err);
    }
  };

  // Start sending frames
  sendFrame();

  // Handle stream closure
  req.on('close', () => {
    console.log('Stream Closed');
    res.end();
  });
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
