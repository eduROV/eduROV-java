const WebSocket = require('ws'); // Import WebSocket library
const { spawn } = require('child_process'); // Import child_process to spawn a child process

// Create a WebSocket server listening on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for client connections to the WebSocket server
wss.on('connection', function connection(ws) {
  console.log('Client connected'); // Log when a client connects

  // Spawn a raspivid process to capture video and output the data to stdout
  const raspivid = spawn('raspivid', ['-t', '0', '-o', '-', '-w', '640', '-h', '480', '-fps', '30']);
  // Event listener for data output by raspivid process
  raspivid.stdout.on('data', (data) => {
    ws.send(data, { binary: true }); // Send video data to the connected WebSocket client
  });

  // Event listener for client disconnection
  ws.on('close', () => {
    console.log('Client disconnected'); // Log when a client disconnects
    raspivid.kill('SIGINT'); // Stop the raspivid process when client disconnects
  });
});

console.log('Server running on port 8080'); // Log server running status
