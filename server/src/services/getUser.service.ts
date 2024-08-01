import { DBConnection } from "./db.service";
import { User, validateUser } from "../models/user.model";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
dotenv.config()
const SECRET = process.env.SECRET || "Password123"
const jwtExpirySeconds = 300

export async function getUser(req: any, res: any) {
    await DBConnection()
    const {token} = req.body
    try {
        const id = await verifyToken(token)
        console.log(id)
        const user = await getUserById(id)
        return res.send({ status : 'Ok', data : user})
    } 
    catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}

async function verifyToken(token: string): Promise<string> {
    try {
      const decoded: any = jwt.verify(token, SECRET);
      return decoded["id"];
    } catch (err: any) {
      throw new Error(`Invalid token: ${err.message}`);
    }
}

async function getUserById(id: string) {
    await DBConnection();
    return User.findById(id);
    
  }