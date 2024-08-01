import { DBConnection } from "./db.service";
import { User, validateUser } from "../models/user.model";
import bcrypt from "bcrypt"

export async function registerUser(req :any, res: any){
    await DBConnection()
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('User already exists. Please sign in')
        
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: password
            })
            await user.save()
            return res.status(201).json(user)
        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }
}
