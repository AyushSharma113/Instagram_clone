// socket.ts
import express, {type Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app: Application = express();

// Create HTTP server to attach Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO server with CORS settings
const io = new Server(server, {
  cors: {
    origin: process.env.URL, // Frontend origin (allowed domain)
    methods: ["GET", "POST"],
  },
});

// Map to store which user is connected to which socket
// Example: { userId: socketId }
const userSocketMap: Record<string, string> = {};

// Helper function to get a user's socket ID
export const getReceiverSocketId = (receiverId: string): string | undefined =>
  userSocketMap[receiverId];

// Socket.IO connection handler
io.on("connection", (socket: Socket) => {
  // Get userId from client query params (sent during connection)
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    userSocketMap[userId] = socket.id; // Store mapping
  }

  // Emit list of all currently online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnect
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId]; // Remove user from map
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users
  });
});

// Export for use in main server file
export { app, server, io };
