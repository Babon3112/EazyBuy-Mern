import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routers/auth.routes.js";
import userRouter from "./routers/user.routes.js";
import cartRouter from "./routers/cart.routes.js";
import productRouter from "./routers/product.routes.js";

dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`MongoDB connection successful !!`))
  .catch((error) => console.log("MONGODB connection FAILED ", error));

app.use(express.json());

app.use("/eazybuy/v1/auth", authRouter);
app.use("/eazybuy/v1/users", userRouter);
app.use("/eazybuy/v1/products", productRouter);
app.use("/eazybuy/v1/shopping-cart", cartRouter);

app.listen(process.env.PORT || 6969, () => {
  console.log(`Backend server is running on port ${process.env.PORT}`);
});
