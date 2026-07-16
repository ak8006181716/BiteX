import express from "express"
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";
import cors from "cors"

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/user", userRouter)


export default app
