import express from "express";
import { authenticatedUser } from "../middlewares/user.js";
import { getMessages, getUsers, sendMessage, } from "../controllers/message.js";

const router=express.Router();

// test route
router.get("/",(req,res)=>{
    res.send("Message route");
});

// get all users except the current user
router.get("/users", authenticatedUser,getUsers);

// get messages between two users
router.get ("/:id",authenticatedUser,getMessages);

// send message
router.post("/send/:id",authenticatedUser,sendMessage);

export default router;