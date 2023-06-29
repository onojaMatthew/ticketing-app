import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();
interface UserPayload {
  _id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

router.get("/currentuser", currentUser, requireAuth, async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
})


export { router as currentuser }