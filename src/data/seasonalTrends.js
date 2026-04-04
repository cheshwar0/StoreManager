// src/data/seasonalTrends.js

/**
 * Knowledge Base for Indian Retail Seasons, Festivals, and Price Volatility.
 * This data is used by the AI Smart Advisor to provide proactive inventory suggestions.
 */
export const SEASONAL_TRENDS = [
  {
    season: "Monsoon (Rainy Season)",
    months: [6, 7, 8], // July, August, September (0-indexed: June-Aug)
    description: "Heavy rains affect transport and crop harvesting, leading to sharp price spikes in perishables.",
    alerts: [
      {
        product: "Onions",
        impact: "Price Increase",
        severity: "High",
        reason: "Supply chain disruptions and storage issues during rain.",
        advice: "Recommend stocking 2x inventory before peak rain in July."
      },
      {
        product: "Toor Dal",
        impact: "Demand Increase",
        severity: "Medium",
        reason: "Higher consumption of pulses during monsoon.",
        advice: "Ensure stable stock levels for the next 3 months."
      }
    ]
  },
  {
    season: "Summer",
    months: [3, 4, 5], // April, May, June
    description: "High heat increases demand for cooling products and staples used in summer recipes.",
    alerts: [
      {
        product: "Refined Oil",
        impact: "Demand Normal",
        severity: "Low",
        reason: "Stable consumption.",
        advice: "No special action needed."
      },
      {
        product: "Dairy (Butter/Ghee)",
        impact: "Supply Shortage",
        severity: "Medium",
        reason: "Milk production traditionally drops during peak summer.",
        advice: "Secure supply from dairy partners early."
      }
    ]
  },
  {
    festival: "Diwali",
    month: 9, // October/November (Simplified to Oct)
    description: "The biggest festival in India. Massive surge in demand for sweets, oils, and snacks.",
    alerts: [
      {
        product: "Pure Ghee (500ml)",
        impact: "Massive Demand Surge",
        severity: "Critical",
        reason: "Used extensively for festive sweets and cooking.",
        advice: "Stock 3x of previous month's volume by early October."
      },
      {
        product: "Sugar (1kg)",
        impact: "Volume Surge",
        severity: "High",
        reason: "Increased sweet making.",
        advice: "Ensure floor stock is visible and bulk packs are available."
      },
      {
        product: "Refined Oil (1L)",
        impact: "Volume Surge",
        severity: "High",
        reason: "Snack preparation for the festival.",
        advice: "Promote 5L packs for higher margins."
      }
    ]
  },
  {
    festival: "Holi",
    month: 2, // March
    description: "Festival of colors. High demand for snacks and beverages.",
    alerts: [
      {
        product: "Snacks / Maggi",
        impact: "Demand Spike",
        severity: "Medium",
        reason: "Easily prepared snacks for guests.",
        advice: "Bundle snacks with beverage offers."
      }
    ]
  }
];

/**
 * Historical Pricing Trends (Mocked for Demo)
 */
export const HISTORICAL_DATA = {
  p1: { name: "Basmati Rice", trend: "Stable", lastYearPriceChange: "+5%" },
  p6: { name: "Refined Oil", trend: "Volatile", lastYearPriceChange: "+20% in Festival Season" },
  p8: { name: "Sugar", trend: "Stable", lastYearPriceChange: "+10% in Festival Season" },
  p12: { name: "Pure Ghee", trend: "High Demand", lastYearPriceChange: "+15% in Diwali" }
};
