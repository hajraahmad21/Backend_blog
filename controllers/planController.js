const asyncHandler = require("express-async-handler");
const Plan = require("../models/Plan/Plan");

const PlanController = {
  createPlan: asyncHandler(async (req, res) => {
    const planBody = req.body;

    const planName = planBody.planName;

    const planFound = await Plan.findOne({ planName });
    if (planFound) throw new Error("Plan already exists");
    const planCount = await Plan.countDocuments();
    if (planCount >= 2) {
      throw new Error("You can create only 2 plans");
    }

    const planCreated = await Plan.create({
    ...planBody,
      user: req.user,
    });
    if (planName) {
      res.send({    
        status: "success",
        message: "Plan created successfully",
        planCreated,
      });
    }
  }),
  getAllPlans: asyncHandler(async (req, res) => {
    const Plans = await Plan.find();
    res.json({
      status: "success",
      message: "Plans fetched successfully",
      Plans,
    });
  }),
  updatePlan: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const planFound = await Plan.findById(id);
    if (!planFound) throw new Error("Plan not found");
    const planUpdated = await Post.findByIdAndUpdate(
      id,
      {
        planName: req.body.planName,
        features: req.body.features,
        price: req.body.price,
      },
      {
        new: true,
      }
    );
    res.send({
      status: "success",
      message: "Plan updated successfully",
      planUpdated,
    });
  }),
  getPlan: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    if (!plan) throw new Error("Plan not found");
    res.send({
      status: "success",
      message: "Plan fetched successfully",
      plan,
    });
  }),
  deletePlan: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const planFound = await Plan.findById(id);

    if (!planFound) {
      console.log("not found");
      throw new Error("Plan not found");
    }
    const planDeleted = await Plan.findByIdAndDelete(id);
    res.send({
      status: "success",
      message: "Plan deleted successfully",
      planDeleted,
    });
  }),
};
module.exports = PlanController;
