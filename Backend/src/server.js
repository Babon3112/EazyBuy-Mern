import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 7777, () => {
      console.log(`⚙️  Server started at ${process.env.PORT}!`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
  });
