import { Router } from "express";
import Stripe from "stripe";

const router = new Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.route("/payment").post((req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.error("Stripe Error:", stripeErr);
        res.status(500).json({ error: "Payment failed" });
      } else {
        console.log("Stripe Response:", stripeRes);
        res.status(200).json({ message: "Payment successful" });
      }
    }
  );
});

export default router;
