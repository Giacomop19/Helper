import { registerUser } from "../services/register.service"

export async function registerController(req: any, res: any, next: any) {
    try {
        res.json(await registerUser(req, res))
    } catch(err) {
        console.error(`Error while registering user`, err)
        next(err)
    }
    
}