// Import necessary modules
const express = require('express');
const { spawn } = require('child_process');

// Create an Express application
const app = express();
const port = 3000; // Server port

// Route for accessing the video stream
app.get('/video-stream', (req, res) => {
  res.connection.setTimeout(0); // Set timeout to zero for a continuous stream

  console.log('Stream Connected');

  // Spawn the raspivid process to capture video from the Raspberry Pi Camera
  // '-o -' outputs the video to stdout, '-t 0' makes it run indefinitely
  // '-w' and '-h' set the width and height of the video respectively
  const raspivid = spawn('raspivid', ['-o', '-', '-t', '0', '-w', '640', '-h', '480']);

  // Pipe the video data to the response object to stream it to the client
  raspivid.stdout.pipe(res);

  // Handle any errors from raspivid
  raspivid.stderr.on('data', (data) => {
    console.error(`raspivid error: ${data}`);
  });

  // Handle stream closure
  raspivid.on('close', () => {
    console.log('Stream Closed');
    res.end();
  });
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
