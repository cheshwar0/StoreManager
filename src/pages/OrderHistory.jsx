// src/pages/OrderHistory.jsx  — frontend-only, reads from localStorage
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Phone, CheckCircle2, Truck, Clock } from 'lucide-react';
import { getOrders } from '../data/mockData';

const OrderHistory = () => {
  const [phone, setPhone]           = useState('');
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchHistory = (e) => {
    if (e) e.preventDefault();
    if (!phone) return;
    setLoading(true);

    // Simulate a tiny async delay for UX feel
    setTimeout(() => {
      const all = getOrders();
      const filtered = all.filter(o => o.customerPhone === phone.trim());
      setOrders(filtered);
      setHasSearched(true);
      setLoading(false);
    }, 600);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':         return <CheckCircle2 size={20} className="text-success" />;
      case 'Out for Delivery':  return <Truck        size={20} className="text-primary" />;
      case 'Assigned':          return <Clock        size={20} className="text-warning" />;
      default:                  return <Package      size={20} className="text-muted"   />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':         return 'success';
      case 'Out for Delivery':  return 'primary';
      case 'Assigned':          return 'warning';
      default:                  return 'secondary';
    }
  };

  return (
    <div className="container mt-4 pb-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark mb-2">Track Your History</h1>
        <p className="text-muted">Enter your mobile number to see all your past orders.</p>

        <form onSubmit={fetchHistory} className="input-group bg-white rounded-pill shadow-sm p-2 max-w-md mx-auto mt-4">
          <span className="input-group-text bg-transparent border-0 px-3 text-muted"><Phone size={20} /></span>
          <input
            required type="tel"
            className="form-control border-0 shadow-none py-2"
            placeholder="Mobile Number (e.g. 9876543210)"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <button disabled={loading} type="submit" className="btn btn-dark rounded-pill px-4 fw-bold">
            {loading ? <span className="spinner-border spinner-border-sm" /> : 'Find My Orders'}
          </button>
        </form>
        {hasSearched && (
          <p className="text-muted small mt-3 opacity-75">
            Demo tip: try <strong>9876543210</strong> for sample orders.
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <AnimatePresence>
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden"
            >
              <div className="card-header bg-white p-4 border-0 d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small text-uppercase fw-bold tracking-widest">
                    Order ID: #{order.id.slice(-6).toUpperCase()}
                  </span>
                  <div className="text-muted smallest mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className={`badge bg-${getStatusColor(order.status)} bg-opacity-10 text-${getStatusColor(order.status)} px-3 py-2 rounded-pill d-flex align-items-center`}>
                  <span className="me-2">{getStatusIcon(order.status)}</span>
                  {order.status}
                </div>
              </div>

              <div className="card-body p-4 bg-light bg-opacity-50">
                <div className="row g-4 mb-3">
                  <div className="col-md-8">
                    <h6 className="fw-bold mb-3 small text-uppercase tracking-wider text-muted font-sans">Items Detail</h6>
                    {order.items.map(item => (
                      <div key={item.productId} className="d-flex justify-content-between mb-2 small">
                        <span>{item.name} <span className="text-muted">× {item.quantity}</span></span>
                        <span className="fw-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-4 border-start border-light ps-md-4">
                    <h6 className="fw-bold mb-3 small text-uppercase tracking-wider text-muted font-sans">Total Paid</h6>
                    <h4 className="fw-bold text-success mb-2">₹{order.totalAmount}</h4>
                    <p className="smallest text-muted mb-0">via {order.paymentMethod}</p>
                  </div>
                </div>

                {order.status !== 'Delivered' && (
                  <div className="alert alert-info border-0 shadow-none mb-0 mt-3 rounded-3 py-2 d-flex align-items-center">
                    <Clock size={16} className="me-2" />
                    <span className="small">Estimated Delivery: <strong>Today within 2 hours</strong></span>
                  </div>
                )}
                {order.status === 'Assigned' && order.deliveryBoy !== 'Not Assigned' && (
                  <div className="mt-3 text-muted smallest d-flex align-items-center">
                    <Truck size={14} className="me-2" />
                    Delivery Partner: <strong className="ms-1 text-dark">{order.deliveryBoy}</strong>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasSearched && orders.length === 0 && !loading && (
          <div className="text-center py-5">
            <Package size={64} className="text-muted opacity-25 mb-3" />
            <h4 className="text-muted">No orders found for this number.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
