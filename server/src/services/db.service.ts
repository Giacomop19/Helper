import mongoose from "mongoose"
import dotenv from "dotenv"
import {uri} from "../configs/db.config"

dotenv.config()

//MongoDB connection
export async function DBConnection() {
    mongoose.connect(uri);
}
