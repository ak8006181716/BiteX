import registerChatSocket from "./chat.socket.js";
import registerNotificationSocket from "./notification.socket.js";
import registerOrderSocket from "./order.socket.js";

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

      registerNotificationSocket(io, socket);
      registerChatSocket(io, socket);
      registerOrderSocket(io, socket);
      
    // Receive message from frontend
    socket.on("send-message", (message) => {
      console.log("Message received:", message);
      // Send message back to the same user
      socket.emit("receive-message", {
        message: `Server received: ${message}`,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default initializeSocket;