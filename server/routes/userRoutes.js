import  express from "express";
import { getPublishedImages, registerUser } from "../controllers/userController.js"
import { loginUser } from "../controllers/userController.js"
import { getUser } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
const userRouter =express.Router();
userRouter.post ('/register',registerUser)
userRouter.post ('/login' , loginUser)
userRouter.get ('/data',protect, getUser)
userRouter.get ('/published-images',protect, getPublishedImages)
export default userRouter;