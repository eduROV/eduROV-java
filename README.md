# eduROV-java
This is a reboot of the eduROV project in 2024, with the aim of simplifying and updating the code to be more approachable by a beginner. Also, for Kristoffer to create his own codebase and fully understand the moving pieces of a remotely controlled robot using a Rapsberry Pi and Arduino. The project will be published on www.edurov.com. 


The overall architecture of the project can be described with two major components, the eduROV robot and the user interface computer. They will each have their different lyers of functionality. 


eduROV robot:
Hardware: 
- Raspberry Pi 3b+ or Raspberry Pi 4 (will be tested first)
- Arduino Micro (is the current microcontroller used, may transition to ESP32 for newer versions)
- Raspberry Pi camera, or alternatively a USB camera later
- eduROV motherboard v0.3, is the current motherboard for the Arduino with various IO.

NodeJS server:
- video streaming
- user input passthrough using websocket?
- MCU IO passthrough via Serial

MCU:
- Analog and digital IO
- Serial link to the Server

Client side:
- HTML site for local network interraction with the server
- accompanying CSS file for the UI


The repository will also house other files such as .stl files for 3D-printing, mechanical drawings for making the ROV frame and chassis etc. 