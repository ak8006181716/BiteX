// Backend/src/sockets/order.socket.js
const registerOrderSocket = (io, socket) => {
  // Restaurant joins its own room
  socket.on("join-restaurant", (restaurantId) => {
    socket.join(`restaurant:${restaurantId}`);

    console.log(
      `Socket ${socket.id} joined restaurant:${restaurantId}`
    );
  });

  // Customer joins their own room
  socket.on("join-user", (userId) => {
    socket.join(`user:${userId}`);

    console.log(`Socket ${socket.id} joined user:${userId}`);
  });
};

export default registerOrderSocket;