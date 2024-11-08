import { Server } from "socket.io";

const setupSocket = (server) => {
  console.log("Setting up Socket.IO...");

  const io = new Server(server, {
    cors: {
      origin: "https://stereamsupport.netlify.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected", socket.id);

    socket.on("disconnect", () => {
      console.log("A client disconnected", socket.id);
    });

    socket.on("donation", (data) => {
      console.log("Donation event received:", data);
    });
  });

  return io;
};

export default setupSocket;
