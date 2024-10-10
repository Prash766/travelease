import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";

const tokenOptions={
    httpOnly: true,
    secure: process.env.NODE_ENV ==="production",
    maxAge: 846400000,
  }

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = await User.create(req.body);

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, tokenOptions);

      return res.status(200).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error(error);
      if (error instanceof ApiError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const loginUser = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error.array(),
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });
  if (!user) throw new ApiError("User not Found", 400);
  const validPwd =await user.isPasswordValid(password)
  if (!validPwd) throw new ApiError("Invalid Password", 400);
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("auth_token", token, tokenOptions);
  return res.status(200).json({
    success:true,
    message:"User logged in Successfully",
    userId: user._id
  })
});

const authCheck = asyncHandler(async(req , res , next)=>{
  return res.status(200).send({
    userId: req.user
  })
})



export { 
    registerUser, 
    loginUser,
    authCheck
 };
