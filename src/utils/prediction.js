// src/utils/prediction.js

/**
 * Calculates average daily sales for a product based on its sales history array.
 * @param {Array<number>} salesHistory array of daily sales numbers
 * @returns {number} average sales value
 */
export const calculateAverageSales = (salesHistory) => {
  if (!salesHistory || salesHistory.length === 0) return 0;
  const total = salesHistory.reduce((sum, current) => sum + current, 0);
  return total / salesHistory.length;
};

/**
 * Determines demand category from average sales.
 * - Avg > 30 = High Demand
 * - 15 <= Avg <= 30 = Medium Demand
 * - Avg < 15 = Low Demand
 */
export const getDemandLabel = (average) => {
  if (average > 30) return "High";
  if (average >= 15) return "Medium";
  return "Low";
};

/**
 * Returns a restock analysis message.
 * - Restock Immediately: High Demand AND Stock < 50
 * - Stock is sufficient: Otherwise
 */
export const getRestockStatus = (demandLabel, currentStock) => {
  if (demandLabel === "High" && currentStock < 50) {
    return { status: "Restock Immediately", urgent: true };
  }
  return { status: "Stock is sufficient", urgent: false };
};
