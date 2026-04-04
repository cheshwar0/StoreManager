// src/pages/CustomerCheckout.jsx  — frontend-only, saves order to localStorage
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Phone, User, CheckCircle2, ChevronLeft, CreditCard, QrCode, Building, Banknote } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { addOrder, genId } from '../data/mockData';

const CustomerCheckout = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { deductStock } = useInventory();
  const { cart, total } = location.state || { cart: [], total: 0 };

  const [step, setStep]                   = useState(1);
  const [form, setForm]                   = useState({ name: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isOrdering, setIsOrdering]       = useState(false);
  const [orderSuccess, setOrderSuccess]   = useState(false);

  const handleNextStep = (e) => { e.preventDefault(); setStep(2); };

  const handleSubmit = async () => {
    if (!cart.length) return;
    setIsOrdering(true);

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const order = {
      id: genId('ord'),
      customerName:   form.name,
      customerPhone:  form.phone,
      address:        form.address,
      items: cart.map(item => ({
        productId:  item.id,
        name:       item.name,
        quantity:   item.quantity,
        price:      item.price,
      })),
      totalAmount:   total + 30,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      status:        'Accepted - Pack Items',
      deliveryBoy:   'Not Assigned',
      createdAt:     new Date().toISOString(),
    };

    addOrder(order);           // persist to localStorage
    deductStock(cart);         // deduct stock in inventory
    setIsOrdering(false);
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="container mt-5 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={100} className="text-success mb-4" />
          <h1 className="fw-bold">Payment Successful &amp; Order Placed!</h1>
          <p className="text-muted fs-5 mb-5">We've received your order and it's being packed right now.</p>
          <button onClick={() => navigate('/history')} className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow">
            Track Your Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mt-4 pb-5">
      <button
        onClick={() => step === 2 ? setStep(1) : navigate('/shop')}
        className="btn btn-link text-dark p-0 mb-4 d-flex align-items-center fw-bold text-decoration-none"
      >
        <ChevronLeft size={20} className="me-1" />
        {step === 2 ? 'Back to Delivery Details' : 'Back to Shop'}
      </button>

      <div className="row g-5">
        {/* ── Left: Steps ── */}
        <div className="col-lg-7">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
                <h2 className="fw-bold mb-5 d-flex align-items-center">
                  <Truck className="me-3 text-primary" size={32} />
                  Delivery Details
                </h2>
                <form onSubmit={handleNextStep}>
                  <div className="mb-4">
                    <label className="form-label text-muted small fw-bold text-uppercase tracking-wider">Full Name</label>
                    <div className="input-group bg-light rounded-pill border-0 px-3 overflow-hidden">
                      <span className="input-group-text bg-transparent border-0"><User size={18} className="text-muted" /></span>
                      <input required type="text" className="form-control bg-transparent border-0 py-3 shadow-none" placeholder="Enter your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small fw-bold text-uppercase tracking-wider">Mobile Number</label>
                    <div className="input-group bg-light rounded-pill border-0 px-3 overflow-hidden">
                      <span className="input-group-text bg-transparent border-0"><Phone size={18} className="text-muted" /></span>
                      <input required type="tel" className="form-control bg-transparent border-0 py-3 shadow-none" placeholder="For order updates &amp; tracking..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="form-label text-muted small fw-bold text-uppercase tracking-wider">Delivery Address</label>
                    <div className="input-group bg-light rounded-4 border-0 px-3 overflow-hidden align-items-start">
                      <span className="input-group-text bg-transparent border-0 mt-3"><MapPin size={18} className="text-muted" /></span>
                      <textarea required rows="4" className="form-control bg-transparent border-0 py-3 shadow-none lh-lg" placeholder="Street, House No, Landmark..." value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-dark w-100 py-3 rounded-pill fw-bold fs-5 shadow-sm">
                    Proceed to Payment
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
                <h2 className="fw-bold mb-5 d-flex align-items-center">
                  <CreditCard className="me-3 text-success" size={32} />
                  Payment Gateway
                </h2>

                <div className="d-flex flex-column gap-3 mb-4">
                  {['UPI', 'Card', 'Netbanking', 'COD'].map(method => (
                    <div
                      key={method}
                      className={`card border cursor-pointer transition-all ${paymentMethod === method ? 'border-success bg-success bg-opacity-10' : 'border-light bg-light bg-opacity-50'}`}
                      onClick={() => setPaymentMethod(method)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body d-flex align-items-center p-3">
                        <input className="form-check-input mt-0 me-3 bg-white" type="radio" checked={paymentMethod === method} readOnly />
                        <span className="fw-bold d-flex align-items-center">
                          {method === 'UPI'        && <QrCode      size={18} className="me-2 text-muted" />}
                          {method === 'Card'       && <CreditCard  size={18} className="me-2 text-muted" />}
                          {method === 'Netbanking' && <Building    size={18} className="me-2 text-muted" />}
                          {method === 'COD'        && <Banknote    size={18} className="me-2 text-muted" />}
                          {method === 'COD' ? 'Cash on Delivery' : method === 'Card' ? 'Credit / Debit Card' : method}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="popLayout">
                  {paymentMethod === 'UPI' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-light p-4 rounded-4 mb-4 text-center overflow-hidden">
                      <QrCode size={100} className="text-dark opacity-50 mb-3 mx-auto d-block" />
                      <p className="text-muted small fw-bold">Scan with any UPI App (GPay, PhonePe, Paytm)</p>
                      <div className="input-group mt-3 shadow-sm rounded-pill overflow-hidden max-w-sm mx-auto">
                        <input type="text" className="form-control text-center bg-white border-0 py-3" placeholder="OR enter UPI ID (e.g. yourname@upi)" />
                      </div>
                    </motion.div>
                  )}
                  {paymentMethod === 'Card' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-light p-4 rounded-4 mb-4 overflow-hidden">
                      <input type="text" className="form-control mb-3 py-3 border-0 bg-white shadow-sm rounded-3" placeholder="0000 0000 0000 0000" />
                      <div className="d-flex gap-3">
                        <input type="text" className="form-control py-3 border-0 bg-white shadow-sm rounded-3" placeholder="MM/YY" />
                        <input type="text" className="form-control py-3 border-0 bg-white shadow-sm rounded-3" placeholder="CVV" />
                      </div>
                    </motion.div>
                  )}
                  {paymentMethod === 'Netbanking' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-light p-4 rounded-4 mb-4 overflow-hidden">
                      <select className="form-select border-0 py-3 bg-white shadow-sm rounded-3 text-muted">
                        <option>Select your Bank</option>
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  disabled={isOrdering}
                  onClick={handleSubmit}
                  className="btn btn-success w-100 py-3 rounded-pill fw-bold fs-5 shadow-sm d-flex align-items-center justify-content-center mt-2"
                >
                  {isOrdering
                    ? <><span className="spinner-border spinner-border-sm me-2" />Processing Payment...</>
                    : paymentMethod === 'COD' ? 'Place Order' : `Pay ₹${total + 30}`
                  }
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
            <h4 className="fw-bold mb-4">Review Order</h4>
            <div className="mb-4 d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: '300px' }}>
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold small">{item.name}</span>
                    <div className="text-muted smallest">Qty: {item.quantity} × ₹{item.price}</div>
                  </div>
                  <div className="fw-bold">₹{item.quantity * item.price}</div>
                </div>
              ))}
            </div>

            <div className="border-top pt-4 mt-auto">
              <div className="d-flex justify-content-between mb-2 pb-1">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">₹{total}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 text-success">
                <span className="small d-flex align-items-center fw-bold">
                  <Truck size={14} className="me-1" /> Flat Shipping
                </span>
                <span className="fw-bold">+₹30</span>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <h4 className="fw-bold fs-3 text-dark">Total Pay</h4>
                <h4 className="fw-bold fs-3 text-success">₹{total + 30}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCheckout;
