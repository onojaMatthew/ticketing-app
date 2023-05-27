import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "@onojanpmorg/common";

export const signup_validator = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").isStrongPassword().withMessage("Invalid password"),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    next();
  }
]

export const signin_validator = [
  body("email").isEmail().trim().withMessage("Please provide a valid email"),
  body("password").trim().notEmpty().withMessage("Invalid password"),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    next();
  }
]
