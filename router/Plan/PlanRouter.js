const planRouter =require("express").Router();
const planController = require("../../controllers/planController")
const isAuthenticated = require("../../middlewares/isAuthenticated")

planRouter.post("/create",isAuthenticated, planController.createPlan);
planRouter.get("",isAuthenticated, planController.getAllPlans);
planRouter.get("/:id",isAuthenticated, planController.getPlan);
planRouter.delete("/:id",isAuthenticated, planController.deletePlan);
planRouter.put("/:id",isAuthenticated, planController.updatePlan);
module.exports = planRouter
    