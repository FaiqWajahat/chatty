import UserModel from "../models/user.js";
import messageModel from "../models/message.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
// Get all users except the current user
export const getUsers = async (req, res) => {
  const myId = req.user._id;
  try {
    const users = await UserModel.find({ _id: { $ne: myId } }).select(
      "-password"
    );
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getting users:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  const { id: receiverId } = req.params;
  const myId = req.user._id;
  try {
    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getting messages:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  const { text, image } = req.body;
  try {
    let imageUrl;

    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image);
      imageUrl = cloudinaryResponse.secure_url;
    }

    const messages = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await messages.save();
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", messages);
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in sending message:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
