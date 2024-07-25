import { login } from "../services/login.service";

export async function loginController(req: any, res: any, next: any) {
    try {
        res.json(await login(req, res))
    } catch(err) {
        console.error(`Error while getting user`, err)
        next(err)
    }
    
}
