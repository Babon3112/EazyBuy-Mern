import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routers/user.routes.js";
import cartRouter from "./routers/cart.routes.js";
import productRouter from "./routers/product.routes.js";
import orderRouter from "./routers/order.routes.js";
import paymentRouter from "./routers/payment.routes.js";

app.use("/eazybuy/v1/users", userRouter);
app.use("/eazybuy/v1/orders", orderRouter);
app.use("/eazybuy/v1/products", productRouter);
app.use("/eazybuy/v1/shopping-cart", cartRouter);
// app.use("/eazybuy/v1/checkout", paymentRouter);

export { app };
