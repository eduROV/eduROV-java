// Import necessary modules
const express = require('express');
const RpiCam = require('rpicam');

// Create an Express application
const app = express();
const port = 3000;

// Initialize the Raspberry Pi camera
const camera = new RpiCam({
  mode: "video",
  output: "-", // Output to stdout
  width: 640,
  height: 480,
  timeout: 999999999, // Keep the camera running
  nopreview: true,
});

// Route for accessing the video stream
app.get('/video-stream', (req, res) => {
  res.connection.setTimeout(0); // Set timeout to zero for a continuous stream
  console.log('Stream Connected');

  // Start the camera
  camera.start();

  // Pipe the video data to the response object
  camera.on('read', (error, timestamp, filename) => {
    if (!error) {
      res.write(filename);
    }
  });

  // Handle stream closure
  req.on('close', () => {
    console.log('Stream Closed');
    camera.stop();
    res.end();
  });
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
