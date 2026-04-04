// src/services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * AI Service for StoreKing Club
 * Provides dynamic market intelligence and seasonal advice.
 */
export const getDynamicAdvice = async (productData, marketTrends) => {
  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn("Gemini API Key missing. Falling back to local knowledge base.");
    return null; // Component will use local SEASONAL_TRENDS fallback
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert Indian Retail Supply Chain Consultant for 'StoreKing Club Online Supermarket'.
      Current Context:
      - Current Date: ${new Date().toLocaleDateString()}
      - Market Trends: ${JSON.stringify(marketTrends)}
      - Store Inventory State: ${JSON.stringify(productData)}

      Task:
      Analyze the current climate (e.g. onset of monsoon, summer peak), upcoming festivals (e.g. Diwali, Holi), and historical price volatility for Indian groceries.
      
      Provide 3-5 high-impact, proactive supply alerts for the store owner.
      Focus on items like Onions, Ghee, Sugar, Oils, and Pulses.
      Format each alert as:
      Product: [Name] | Impact: [Price Hike/Demand Surge/Shortage] | Severity: [Low/Medium/High/Critical] | Reason: [Concise Explanation] | Advice: [Actionable Suggestion]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null;
  }
};
