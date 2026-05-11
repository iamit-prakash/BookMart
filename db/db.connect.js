import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const mongoUri = process.env.MONGODB

export const initializeDatabase = async () => {
  try {
    await mongoose.connect(mongoUri)

    console.log("Connected to database")
  } catch (error) {
    throw error
  }
}