import express, { Request, Response } from "express";
const { current_user } = require("@onojanpmorg/common") ;
const { requireAuth } = require("@onojanpmorg/common");

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