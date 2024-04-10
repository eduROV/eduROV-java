const WebSocket = require('ws');
const { spawn } = require('child_process');

// Create a WebSocket server listening on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Spawn an FFmpeg process to capture and convert video to fragmented MP4
  const ffmpeg = spawn('ffmpeg', [
    '-i', '-', // Input from stdin (standard input)
    '-f', 'mp4', // Set format to MP4
    '-movflags', 'frag_keyframe+empty_moov', // Use fragmented MP4 flags
    '-vcodec', 'libx264', // Use the H.264 video codec
    '-preset', 'ultrafast', // Ultrafast preset for minimal CPU usage
    '-tune', 'zerolatency', // Tune for zerolatency
    '-', // Output to stdout (standard output)
  ]);

  // Set up raspivid to pipe video to FFmpeg
  const raspivid = spawn('raspivid', ['-t', '0', '-o', '-', '-w', '640', '-h', '480', '-fps', '20']);
  raspivid.stdout.pipe(ffmpeg.stdin);

  // When FFmpeg produces data, send it to the WebSocket client
  ffmpeg.stdout.on('data', (data) => {
    ws.send(data, { binary: true });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    raspivid.kill('SIGINT');
    ffmpeg.kill('SIGINT');
  });
});

console.log('Server running on port 8080');
