// src/data/salesData.js
// Dummy daily sales data for 7 days
const salesHistory = {
  rice: [15, 20, 25, 40, 35, 50, 45], // High demand (avg ~32)
  milk: [20, 22, 18, 25, 30, 28, 21], // Medium demand (avg ~23)
  sugar: [5, 8, 12, 10, 15, 9, 11]    // Low demand (avg ~10)
};

// Current inventory details
export const inventoryData = [
  {
    id: 1,
    name: "Rice (1kg)",
    category: "Grains",
    stock: 45, // Less than 50 (triggers restock if demand is High)
    price: 60,
    salesHistory: salesHistory.rice
  },
  {
    id: 2,
    name: "Milk (1L)",
    category: "Dairy",
    stock: 60,
    price: 50,
    salesHistory: salesHistory.milk
  },
  {
    id: 3,
    name: "Sugar (1kg)",
    category: "Groceries",
    stock: 120,
    price: 45,
    salesHistory: salesHistory.sugar
  }
];

export const getDates = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
  }
  return dates;
};
