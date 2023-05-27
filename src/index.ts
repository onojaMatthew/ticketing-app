import mongoose from "mongoose";
import { app } from "./app";

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-service:27017/auth");
    console.log("Connected to mongodb!!")
  } catch (err) {
    console.log(err)
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!")
  });
}

startup();