import { getUser } from "../services/getUser.service"
import { Request, Response } from "express"
export async function getUserController(req: Request, res: Response, next: any) {
    try {
        // res.json(await getUser(req, res))
        res.json(await getUser(req, res))
    } catch(err) {
        console.error(`Error while getting user data`, err)
        next(err)
    }
    
}