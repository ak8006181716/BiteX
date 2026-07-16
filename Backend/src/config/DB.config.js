import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const connectDB = async () => {
    console.log(process.env.MONGODB_URI)
    
    try {
        
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables")
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
