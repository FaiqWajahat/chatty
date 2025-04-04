import joi from "joi";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Signup Validation
export const signupValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().trim().required().messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    fullName: joi.string().trim().required().messages({
      "any.required": "Full name is required.",
    }),
    password: joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

// Login Validation
export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().trim().required().messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    password: joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

// Authenticated User
export const authenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.token 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access - No Token Provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.name === "TokenExpiredError" ? "Token Expired" : "Invalid Token",
      });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access - User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in authenticatedUser middleware:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
