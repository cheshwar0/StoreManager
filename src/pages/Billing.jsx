// src/pages/Billing.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import InvoiceModal from '../components/InvoiceModal';

import { addOrder, genId } from '../data/mockData';

const Billing = () => {
  const { products, loading, processSale } = useInventory();
  const [searchTerm, setSearchTerm]   = useState('');
  const [cart, setCart]               = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrder, setLastOrder]     = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) && p.stock > 0
    );
  }, [products, searchTerm]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        alert('Cannot add more than available stock!');
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id !== id) return item;
      const newQty = Math.max(1, item.quantity + delta);
      if (newQty > item.stock) { alert('Maximum stock reached!'); return item; }
      return { ...item, quantity: newQty };
    }));
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% GST
    return { subtotal, tax, total: subtotal + tax };
  }, [cart]);

  const handleCompleteSale = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    try {
      // 1. Process stock updates
      for (const item of cart) {
        processSale(item.id, item.quantity);
      }

      // 2. Create formal order record for history/dashboard
      const order = {
        id: genId('ord'),
        customerName: 'Walk-in Customer',
        customerPhone: 'N/A',
        address: 'In-store Purchase',
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totals.total,
        paymentMethod: 'Cash/Card',
        paymentStatus: 'Paid',
        status: 'Delivered',
        deliveryBoy: 'Counter Staff',
        createdAt: new Date().toISOString()
      };
      
      addOrder(order);

      setLastOrder({ ...order, totals, date: new Date().toLocaleString() });
      setCart([]);
    } catch (err) {
      alert('Failed to complete sale. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="container mt-5 text-center">Loading Inventory...</div>;

  return (
    <div className="container mt-4 pb-5">
      <div className="row g-4">
        {/* Left: Product Selection */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h4 className="fw-bold mb-4 d-flex align-items-center text-laxmi-green">
              <ShoppingCart className="me-2" size={24} />
              Sri Lakshmi • <span className="ms-2 opacity-75 small text-sk-blue fw-black text-uppercase">StoreKing CLUb</span>
            </h4>
            <div className="input-group mb-4 bg-light rounded-pill border-0 px-3">
              <span className="input-group-text bg-transparent border-0"><Search size={18} className="text-muted" /></span>
              <input
                type="text"
                className="form-control bg-transparent border-0 py-2 shadow-none"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="row g-3 overflow-auto" style={{ maxHeight: '500px' }}>
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-md-6"
                  >
                    <div
                      onClick={() => addToCart(product)}
                      className="p-3 border rounded-3 h-100 transition-all hover-shadow"
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fw-bold text-dark fs-6">{product.name}</span>
                        <span className="badge bg-success bg-opacity-10 text-success">₹{product.price}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{product.category}</small>
                        <span className={`fw-bold ${product.stock < 10 ? 'text-danger' : 'text-sk-blue'}`}>
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredProducts.length === 0 && (
                <div className="text-center py-5 text-muted">No products found or out of stock.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Cart & Checkout */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
            <div className="card-header bg-laxmi-green text-white p-4 border-0">
              <h4 className="fw-bold mb-0 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div>
                    <h1 className="fw-black mb-1 display-6 tracking-tight text-white">Checkout</h1>
                    <div className="d-flex align-items-center gap-2 opacity-75">
                      <div className="bg-white text-laxmi-green px-2 py-0 rounded-1 fw-black" style={{ fontSize: '0.6rem' }}>SK</div>
                      <span className="smallest text-uppercase fw-bold text-white">CLUB Partner Sync</span>
                    </div>
                  </div>
                </div>
              </h4>
            </div>
            <div className="card-body p-4 d-flex flex-column">
              <div className="flex-grow-1 overflow-auto mb-4" style={{ maxHeight: '400px' }}>
                {cart.length === 0 ? (
                  <div className="text-center py-5">
                    <ShoppingCart size={48} className="text-muted mb-3 opacity-25" />
                    <p className="text-muted">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr className="small text-muted text-uppercase">
                          <th>Item</th>
                          <th className="text-center">Qty</th>
                          <th className="text-end">Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(item => (
                          <tr key={item.id}>
                            <td>
                              <div className="fw-bold small">{item.name}</div>
                              <div className="text-muted smallest">₹{item.price}</div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-sm btn-outline-secondary rounded-circle p-1"><Minus size={12} /></button>
                                <span className="small fw-bold">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}  className="btn btn-sm btn-outline-secondary rounded-circle p-1"><Plus size={12} /></button>
                              </div>
                            </td>
                            <td className="text-end fw-bold">₹{item.price * item.quantity}</td>
                            <td className="text-end">
                              <button onClick={() => removeFromCart(item.id)} className="btn btn-link text-danger p-0">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Total Summary */}
              <div className="bg-light p-4 rounded-4 mt-auto">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-bold">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                  <span className="text-muted d-flex align-items-center">
                    GST (5%) <small className="ms-1 smallest opacity-50 px-1 border rounded">AUTO</small>
                  </span>
                  <span className="fw-bold">₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <h4 className="fw-bold mb-0">Total Payable</h4>
                  <h4 className="fw-bold mb-0 text-sk-orange">₹{totals.total.toLocaleString('en-IN')}</h4>
                </div>
                <button
                  disabled={cart.length === 0 || isProcessing}
                  onClick={handleCompleteSale}
                  className="btn btn-sk-orange shadow-lg w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center"
                >
                  {isProcessing
                    ? <span className="spinner-border spinner-border-sm me-2" />
                    : <CreditCard size={20} className="me-2 text-white" />
                  }
                  Finalize Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Success Modal */}
      {lastOrder && (
        <InvoiceModal order={lastOrder} onClose={() => setLastOrder(null)} />
      )}
    </div>
  );
};

export default Billing;
