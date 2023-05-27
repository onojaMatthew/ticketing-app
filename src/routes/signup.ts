import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const { BadRequestError } = require("@onojanpmorg/common");
import { User } from "../models/user";
import { signup_validator } from "../validator";

const router = express.Router();

router.post("/signup", signup_validator, async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError("User already exists");

  const user = User.build({ email, password });
  await user.save();
  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY!);
  req.session = {
    token
  }
  return res.status(201).json(user);
});


export { router as signupRoutes }