import { DBConnection } from "./db.service";
import { User, validateUser } from "../models/user.model";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import { Response, Request } from "express";
dotenv.config()
const SECRET = process.env.SECRET || "Password123"
const jwtExpirySeconds = 300

export async function login(req: Request, res: Response) {
    await DBConnection()
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(401).send(error.details[0].message)
    } else {
        try {
            let user = await User.findOne({ username: req.body.username })
            if (!user) {
                return res.status(400).json({ message: 'Incorrect username or password.' })
            }
            const correctPassword = await bcrypt.compare(req.body.password, user.password)
            if (!correctPassword) {
                return res.status(400).json({ message: 'Incorrect username or password.' })
            }
            const token = jwt.sign({ id: user._id }, SECRET)
            res.cookie(
                "token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: "strict",
                maxAge: jwtExpirySeconds * 1000
            })
            res.json({ message: 'Successfully logged in', token: token })

        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }
}