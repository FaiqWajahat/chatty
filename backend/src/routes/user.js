import express from "express";
import { signupController, loginController,logoutController, updateProfile, userAcess } from "../controllers/user.js";
import {signupValidation,loginValidation, authenticatedUser} from "../middlewares/user.js";

const router = express.Router();

//testing route
router.get("/", (req, res) => {
  res.send("Hello World");
});

//signup route
router.post("/signup", signupValidation, signupController);

//login route
router.post("/login", loginValidation, loginController);

//logout route
router.post("/logout",logoutController);

//update profile route
router.put("/updateProfile", authenticatedUser, updateProfile)

//AUTHENTICATED USER
router.get("/check", authenticatedUser, userAcess);


export default router;
