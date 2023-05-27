import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
import { json } from "body-parser";
import { routes } from "./routes/index";
import { errorHandler } from "@onojanpmorg/common";
import { NotFoundError } from "@onojanpmorg/common";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test"
}))
// app.use(cors({
//   origin: "*",
//   methods: "GET,PUT,POST,DELETE, PATCH",
//   credentials: true
// }))
routes(app);

app.all("*", async () => {
  throw new NotFoundError();
})
app.use(errorHandler);

export { app }