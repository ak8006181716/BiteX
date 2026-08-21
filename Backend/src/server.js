import { Server } from "socket.io";
import http from "node:http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import initializeSocket from "./sockets/index.js";

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
initializeSocket(io);


const Port = process.env.PORT || process.env.Port || 5000;

const startServer = async () => {
  try {
    await connectDB();

    server.listen(Port, () => {
      console.log(`server is running on the ${Port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

