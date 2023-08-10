import express, { Request, Response } from "express";
import { current_user, requireAuth } from "@onojanpmorg/common";
// import { currentUser } from "../middlewares/current-user";
// import { requireAuth } from "../middlewares/require-auth";

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

router.get("/currentuser", current_user, requireAuth, async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
})


export { router as currentuser }