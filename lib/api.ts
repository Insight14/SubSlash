const API_BASE_URL = 'http://localhost:8080/api';

export interface SubscriptionData {
  id: number;
  userId: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  subscriptions: Array<{
    subscriptionId: string;
    name: string;
    paymentAmount: number;
    billingCycle: string;
    expiryDate: string;
    status: string;
  }>;
}

export const fetchUserSubscriptions = async (userId: string = 'user_001'): Promise<SubscriptionData | null> => {
  try {
    // First, get all subscriptions
    const response = await fetch(`${API_BASE_URL}/subscriptions`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const subscriptions: SubscriptionData[] = await response.json();
    
    // Find the user's data
    const userData = subscriptions.find(sub => sub.userId === userId);
    return userData || null;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return null;
  }
};

export const getSubscriptionById = async (id: number): Promise<SubscriptionData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SubscriptionData = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching subscription ${id}:`, error);
    return null;
  }
};
