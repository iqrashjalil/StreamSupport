// socket.js
import { io } from "socket.io-client";

// The URL of your backend server running Socket.IO
const URL = "https://streamsupport-production.up.railway.app"; // Replace with your backend server URL and port

// Initialize the socket connection with options
const socket = io(URL, {
  withCredentials: true, // Include credentials (cookies) if required
  autoConnect: true, // Automatically connect when the app loads
  transports: ["websocket"], // Use WebSocket transport for better performance
});

// Add any custom event handlers you need (optional)
socket.on("connect", () => {
  console.log("Connected to the WebSocket server with ID:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the WebSocket server");
});

export default socket;
