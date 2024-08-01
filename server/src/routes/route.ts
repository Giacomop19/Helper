//routes/getUser -> test
import express from "express";
import { loginController } from "../controllers/login.controller";
import { registerController } from "../controllers/register.controller";
import { getUserController } from "../controllers/getUser.controller";

const router = express.Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.post('/getUser', getUserController)


module.exports = router
