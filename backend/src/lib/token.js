import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const settingToken = (payLoad, res) => {
  try {
    // Validate JWT secret key
    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "JWT secret key is missing",
      });
    }

    // Creating a token
    const jwtToken = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    if (!jwtToken) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate token",
      });
    }

    // Sending cookie in response
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development", 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

     return true;
    
  } catch (err) {
    console.error("Error in setting token:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default settingToken;
