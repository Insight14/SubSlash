const SUBSCRIPTIONS_STORE = [
  {
    id: 1,
    userId: "user_001",
    cardNumber: "4532 1234 5678 9010",
    cardHolderName: "John Doe",
    expiryDate: "12/25",
    cvv: "123",
    subscriptions: [
      {
        subscriptionId: "sub_001",
        name: "Netflix Premium",
        paymentAmount: 15.99,
        billingCycle: "Monthly",
        expiryDate: "2025-02-10",
        status: "Active"
      },
      {
        subscriptionId: "sub_002",
        name: "Spotify Premium",
        paymentAmount: 10.99,
        billingCycle: "Monthly",
        expiryDate: "2025-01-25",
        status: "Active"
      }
    ]
  },
  {
    id: 2,
    userId: "user_002",
    cardNumber: "5425 2334 3010 9903",
    cardHolderName: "Jane Smith",
    expiryDate: "08/26",
    cvv: "456",
    subscriptions: [
      {
        subscriptionId: "sub_003",
        name: "Adobe Creative Cloud",
        paymentAmount: 54.99,
        billingCycle: "Monthly",
        expiryDate: "2025-03-15",
        status: "Active"
      },
      {
        subscriptionId: "sub_004",
        name: "Apple Music",
        paymentAmount: 10.99,
        billingCycle: "Monthly",
        expiryDate: "2025-02-05",
        status: "Active"
      }
    ]
  },
  {
    id: 3,
    userId: "user_003",
    cardNumber: "3782 822463 10005",
    cardHolderName: "Michael Johnson",
    expiryDate: "06/27",
    cvv: "1234",
    subscriptions: [
      {
        subscriptionId: "sub_005",
        name: "Microsoft 365",
        paymentAmount: 9.99,
        billingCycle: "Monthly",
        expiryDate: "2025-01-30",
        status: "Active"
      },
      {
        subscriptionId: "sub_006",
        name: "Disney+",
        paymentAmount: 7.99,
        billingCycle: "Monthly",
        expiryDate: "2025-04-20",
        status: "Active"
      },
      {
        subscriptionId: "sub_007",
        name: "Amazon Prime Video",
        paymentAmount: 14.99,
        billingCycle: "Monthly",
        expiryDate: "2025-03-10",
        status: "Inactive"
      }
    ]
  }
];

module.exports = SUBSCRIPTIONS_STORE;
