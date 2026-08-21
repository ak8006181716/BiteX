// Backend/src/sockets/notification.socket.js
const registerNotificationSocket = (io, socket) => {
  socket.on("send-notification", (data) => {
    console.log("Notification received:", data);

    // Send notification back to the same user
    socket.emit("receive-notification", {
      message: "Notification received successfully",
      data,
    });
  });
};

export default registerNotificationSocket;