import dotenv from "dotenv"
import connectDB from "./config/DB.config.js"
import app from "./app.js"

dotenv.config()

connectDB()

const Port = process.env.PORT || process.env.Port || 3000









app.get("/", (req, res) => {
    res.send("hello from server")
})

app.listen(Port, () => {
    console.log(`server is running on ${Port}`)
})  