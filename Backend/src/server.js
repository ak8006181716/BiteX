
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

const Port = process.env.PORT || process.env.Port || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(Port, () => {
      console.log(`server is running on the ${Port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

