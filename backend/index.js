const express = require("express");
const subscriptionsRoutes = require("./routes/subscriptions_routes");

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

// Routes
app.use("/api", subscriptionsRoutes);

// Welcome endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Subscriptions API",
    version: "1.0.0",
    endpoints: {
      getAllSubscriptions: "GET /api/subscriptions",
      getSubscriptionById: "GET /api/subscriptions/:id",
      addNewSubscription: "POST /api/subscriptions",
      updateSubscription: "PUT /api/subscriptions/:id",
      deleteSubscription: "DELETE /api/subscriptions/:id"
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
