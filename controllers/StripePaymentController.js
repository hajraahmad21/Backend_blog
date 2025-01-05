const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Plan = require("../models/Plan/Plan");
const User = require("../models/User/User");
const Payment = require("../models/Payment/Payment");
// Fetch the subscription plan
const stripePaymentController = {
  payment: asyncHandler(async (req, res) => {
    const { subscriptionPlanId } = req.body;
    if (!mongoose.isValidObjectId(subscriptionPlanId)) {
      return res.status(400).json({
        message: "Invalid subscription plan ID",
      });
    }
    const plan = await Plan.findById(subscriptionPlanId);
    if (!plan) {
      return res.status(404).json({
        message: "Subscription plan not found",
      });
    }
    const user = req.user;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: plan.price * 100, // amount in cents
        currency: "usd",
        //add some metadata
        metadata: {
          userId: user.toString(),
          userEmail: user?.email,
          planId: subscriptionPlanId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        message: "Payment intent created",
        clientSecret: paymentIntent.client_secret,
        userEmail: user.email,
        planId: subscriptionPlanId,
        paymentIntent,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }),
  verify: asyncHandler(async (req, res) => {
    const { paymentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    if (paymentIntent.status === "requires_payment_method") {
      return res.status(400).json({
        message: "Payment failed",
      });
    }
    if (paymentIntent.status === "success") {
      const metadata = paymentIntent.metadata;
      const subscriptionPlanId = metadata.planId;
      const userId = metadata.userId;
      const userFound = await User.findById(userId);
      if (!userFound) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      console.log("userId", userId);
      const amount = paymentIntent.amount / 100;
      const currency = paymentIntent.currency;
      const newPayment = await Payment.create({
        userId,
        subscriptionPlan: subscriptionPlanId,
        amount,
        currency,
        status: "success",
        reference: paymentId,
      });
      if (newPayment) {
        userFound.hasSelectedPlan = true;
        userFound.plan = subscriptionPlanId;
        await userFound.save();
      }

      return res.status(200).json({
        message: "Payment success",
        userFound,
      });
    }
  }),
};
module.exports = stripePaymentController;
