import { Router } from "express";
import { googleSignUp } from "../controllers/userController.js";



const userRouter = Router();

userRouter.post('/user/google-register', googleSignUp)

export default userRouter;