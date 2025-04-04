import express from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import  settingToken  from "../lib/token.js";
import cloudinary from "../lib/cloudinary.js";

dotenv.config();

const app = express();
app.use(express.json()); 

// Signup function
const signupController = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ email, fullName, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "User creation failed", success: false, error });
  }
};

// Login function
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    // Generate and set token in response
   const result= await settingToken({ userId: userExist._id }, res);
   if(result)
   {
    return res.status(200).json({
      success: true,
      message: "logged in successfully",
      user:userExist
    });
  

   }
 
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "User login failed", success: false, error: error.message });
  }
};

// logout function
 const logoutController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


// Update profile function
const updateProfile = async (req, res) => {
  try {
    const { uploadImage } = req.body;
    const userId = req.user._id;

    if (!uploadImage) {
      return res.status(400).json({ message: "Please upload an image", success: false });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(uploadImage, {
      folder: "profile_pictures",
    });

    // Update user profile image
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: cloudinaryResponse.secure_url },
      { new: true }
    );

    res.status(200).json({ message: "Profile updated successfully", success: true, updatedUser });

  } catch (error) {
    console.error("Error in updating profile:", error);
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};

// accessing user
const userAcess =  (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in accessing user:", error);
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};
export { signupController, loginController,logoutController, updateProfile, userAcess };
