import dotenv from "dotenv"
dotenv.config();
const pswMongo = process.env.MONGO_PSW
export const uri  = `mongodb+srv://giacomo:${pswMongo}@cluster0.6qjz6t7.mongodb.net/Helper?retryWrites=true&w=majority&appName=Cluster0`

