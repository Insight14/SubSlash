const express = require("express");
const router = express.Router();
const subscriptionsController = require("../controllers/subscriptions_controller");

// GET all subscriptions/card details
router.get("/subscriptions", subscriptionsController.getAllSubscriptions);

// GET subscription by ID
router.get("/subscriptions/:id", subscriptionsController.getSubscriptionById);

// POST new subscription/card details
router.post("/subscriptions", subscriptionsController.addNewSubscription);

// PUT update subscription/card details
router.put("/subscriptions/:id", subscriptionsController.updateSubscription);

// DELETE subscription/card details
router.delete("/subscriptions/:id", subscriptionsController.deleteSubscription);

module.exports = router;
