// src/context/InventoryContext.jsx  — fully frontend / no backend
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, saveProducts } from '../data/mockData';

const InventoryContext = createContext();
export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // ── Load products from localStorage ─────────────────────────
  const fetchProducts = () => {
    try {
      setLoading(true);
      const data = getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load inventory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Add a new product ────────────────────────────────────────
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `p_${Date.now()}`,
      salesHistory: [0, 0, 0, 0, 0, 0, 0],
    };
    const updated = [...getProducts(), newProduct];
    saveProducts(updated);
    setProducts(updated);
    return newProduct;
  };

  // ── Update stock for a product ───────────────────────────────
  const updateStock = (id, newStock) => {
    const updated = getProducts().map(p =>
      p.id === id ? { ...p, stock: Math.max(0, newStock) } : p
    );
    saveProducts(updated);
    setProducts(updated);
    return updated.find(p => p.id === id);
  };

  // ── Record a sale (called by Billing page) ───────────────────
  const processSale = (productId, quantity) => {
    const updated = getProducts().map(p => {
      if (p.id !== productId) return p;
      const newStock = Math.max(0, p.stock - quantity);
      const history = [...p.salesHistory];
      history[history.length - 1] = (history[history.length - 1] || 0) + quantity;
      return { ...p, stock: newStock, salesHistory: history };
    });
    saveProducts(updated);
    setProducts(updated);
    return updated.find(p => p.id === productId);
  };

  // ── Deduct stock after customer checkout (with sales history) ──
  const deductStock = (cartItems) => {
    const updated = getProducts().map(p => {
      const cartItem = cartItems.find(c => c.id === p.id);
      if (!cartItem) return p;
      const newStock = Math.max(0, p.stock - cartItem.quantity);
      const history = [...p.salesHistory];
      history[history.length - 1] = (history[history.length - 1] || 0) + cartItem.quantity;
      return { ...p, stock: newStock, salesHistory: history };
    });
    saveProducts(updated);
    setProducts(updated);
  };

  return (
    <InventoryContext.Provider
      value={{ products, loading, error, fetchProducts, addProduct, updateStock, processSale, deductStock }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
