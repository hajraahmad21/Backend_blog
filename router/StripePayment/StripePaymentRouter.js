const stripePaymentRouter =require("express").Router();
const stripePaymentController = require("../../controllers/StripePaymentController")
const isAuthenticated = require("../../middlewares/isAuthenticated")

stripePaymentRouter.post("/checkout", isAuthenticated, stripePaymentController.payment);
stripePaymentRouter.get("/verify/:paymentId", isAuthenticated, stripePaymentController.verify);

module.exports = stripePaymentRouter
