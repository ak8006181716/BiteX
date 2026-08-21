// Backend/src/sockets/chat.socket.js
const registerChatSocket = (io, socket) => {

  // User joins a chat room
  socket.on("join-chat", (chatId) => {
    socket.join(`chat:${chatId}`);

    console.log(`User ${socket.id} joined chat:${chatId}`);
  });


  // User sends a message
  socket.on("send-message", ({ chatId, message }) => {

    console.log("Message received:", message);

    // Send message to everyone in that chat room
    io.to(`chat:${chatId}`).emit("receive-message", {
      chatId,
      message,
      senderSocketId: socket.id,
    });

  });

};

export default registerChatSocket;