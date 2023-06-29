import express, { Request, Response } from "express";
import { BadRequestError } from "@onojanpmorg/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import { signin_validator } from "../validator";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signin", signin_validator, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("Invalid credentials");
  const isMatched = await Password.compare(user.password, password);
  if (!isMatched) throw new BadRequestError("Invalid password");
  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY!);
  req.session = {
    token
  }
  return res.status(200).json(user);
})


export { router as signinRoute }