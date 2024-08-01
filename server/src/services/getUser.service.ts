import { DBConnection } from "./db.service";
import { User } from "../models/user.model";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import { Response, Request } from "express";
dotenv.config()
const SECRET = process.env.SECRET || "Password123"

export async function getUser(req: Request, res: Response) {
    await DBConnection()
    const {token} = req.body
    try {
        const id = await verifyToken(token)
        const user = await getUserById(id)
        return res.send({ status : 'Ok', data : user})
        // const user = await User.findById(id)
        //     .then((data) => {console.log(data) ; return data})
        //     .catch((err) => {return err})
        // return res.send({ status : 'Ok', data : user})
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