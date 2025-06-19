import express from "express"

import { login, logout, register } from "../controllers/user.controller.js"

const userRouter = express.Router();

userRouter.post("/signup", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)




export default userRouter;