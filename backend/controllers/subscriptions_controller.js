const SUBSCRIPTIONS_STORE = require("../data/SUBSCRIPTIONS_STORE");

// Helper function to generate random card number
const generateCardNumber = () => {
  const parts = [];
  for (let i = 0; i < 4; i++) {
    parts.push(Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
  }
  return parts.join(" ");
};

// Get all card details with subscriptions
const getAllSubscriptions = (req, res) => {
  res.json(SUBSCRIPTIONS_STORE);
};

// Get card details and subscriptions by ID
const getSubscriptionById = (req, res) => {
  const { id } = req.params;
  const subscription = SUBSCRIPTIONS_STORE.find(sub => sub.id === parseInt(id));
  
  if (!subscription) {
    return res.status(404).json({ error: "Subscription record not found" });
  }
  
  res.json(subscription);
};

// Add new card with subscriptions
const addNewSubscription = (req, res) => {
  const { userId, cardHolderName, expiryDate, cvv, subscriptions } = req.body;
  
  if (!userId || !cardHolderName || !expiryDate || !cvv || !subscriptions) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  const newSubscription = {
    id: SUBSCRIPTIONS_STORE.length > 0 ? Math.max(...SUBSCRIPTIONS_STORE.map(s => s.id)) + 1 : 1,
    userId,
    cardNumber: generateCardNumber(),
    cardHolderName,
    expiryDate,
    cvv,
    subscriptions: subscriptions.map((sub, idx) => ({
      subscriptionId: `sub_${Date.now()}_${idx}`,
      ...sub
    }))
  };
  
  SUBSCRIPTIONS_STORE.push(newSubscription);
  res.status(201).json(newSubscription);
};

// Update card details or subscriptions
const updateSubscription = (req, res) => {
  const { id } = req.params;
  const { cardHolderName, expiryDate, cvv, subscriptions } = req.body;
  
  const subscription = SUBSCRIPTIONS_STORE.find(sub => sub.id === parseInt(id));
  
  if (!subscription) {
    return res.status(404).json({ error: "Subscription record not found" });
  }
  
  if (cardHolderName) subscription.cardHolderName = cardHolderName;
  if (expiryDate) subscription.expiryDate = expiryDate;
  if (cvv) subscription.cvv = cvv;
  if (subscriptions) {
    subscription.subscriptions = subscriptions.map((sub, idx) => ({
      subscriptionId: sub.subscriptionId || `sub_${Date.now()}_${idx}`,
      ...sub
    }));
  }
  
  res.json(subscription);
};

// Delete card and all associated subscriptions
const deleteSubscription = (req, res) => {
  const { id } = req.params;
  const index = SUBSCRIPTIONS_STORE.findIndex(sub => sub.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ error: "Subscription record not found" });
  }
  
  const deletedSubscription = SUBSCRIPTIONS_STORE.splice(index, 1);
  res.json(deletedSubscription[0]);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addNewSubscription,
  updateSubscription,
  deleteSubscription
};
