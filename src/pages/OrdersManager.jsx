// src/pages/OrdersManager.jsx  — frontend-only, reads/writes localStorage
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, CheckCircle2, User, MapPin, Clock, Phone } from 'lucide-react';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { getOrders, saveOrders } from '../data/mockData';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { user } = useAuth();

  const fetchOrders = () => {
    setOrders(getOrders());
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    // Poll localStorage every 10 seconds for new orders placed in the same tab/window
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id, status, deliveryBoy = null) => {
    const updated = getOrders().map(o => {
      if (o.id !== id) return o;
      return {
        ...o,
        status,
        ...(deliveryBoy !== null && { deliveryBoy }),
      };
    });
    saveOrders(updated);
    setOrders(updated);
  };

  const filteredOrders = orders.filter(o => filter === 'All' || o.status === filter);

  if (loading) return <Spinner />;

  return (
    <div className="container mt-4 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div>
          <h1 className="fw-bold text-dark d-flex align-items-center">
            <Truck className="me-3 text-primary" size={32} />
            Fulfillment Center
          </h1>
          <p className="text-muted">Manage incoming orders and delivery logistics</p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {['All', 'Accepted - Pack Items', 'Assigned', 'Out for Delivery', 'Delivered'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`btn btn-sm rounded-pill px-3 ${filter === s ? 'btn-dark' : 'btn-outline-secondary'}`}
            >
              {s === 'Accepted - Pack Items' ? 'Pack Now!' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        <AnimatePresence>
          {filteredOrders.map(order => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-lg-6"
            >
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                <div className="card-header bg-white p-4 border-0 d-flex justify-content-between">
                  <div>
                    <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
                      #{order.id.slice(-6).toUpperCase()}
                    </span>
                    <h5 className="fw-bold mb-1">{order.customerName}</h5>
                    <div className="text-muted small d-flex align-items-center mb-1">
                      <Phone size={14} className="me-1 opacity-75" /> {order.customerPhone}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-success fs-5 lh-1 mb-1">₹{order.totalAmount}</div>
                    <div className="mb-1">
                      {order.paymentStatus === 'Paid' ? (
                        <span className="badge bg-success bg-gradient small shadow-sm">
                          <CheckCircle2 size={12} className="me-1 d-inline-block" style={{marginTop:'-2px'}} />
                          PAID - {order.paymentMethod}
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark bg-gradient small shadow-sm">
                          <Clock size={12} className="me-1 d-inline-block" style={{marginTop:'-2px'}} />
                          {order.paymentMethod === 'COD' ? 'COLLECT CASH' : 'UNPAID'}
                        </span>
                      )}
                    </div>
                    <small className="text-muted smallest">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </small>
                  </div>
                </div>

                <div className="card-body p-4 bg-light bg-opacity-25 pt-0">
                  <div className="mb-4 bg-white p-3 rounded-3 border border-light shadow-sm">
                    <h6 className="fw-bold small text-uppercase text-muted tracking-widest mb-2 font-sans" style={{ fontSize: '0.7rem' }}>Delivery Address</h6>
                    <div className="d-flex align-items-start text-dark small">
                      <MapPin size={16} className="me-2 mt-1 text-primary opacity-75 flex-shrink-0" />
                      <span className="lh-sm">{order.address}</span>
                    </div>
                  </div>

                  {order.status === 'Accepted - Pack Items' && (
                    <div className="alert alert-warning mb-3 py-2 px-3 shadow-sm border border-warning text-dark d-flex align-items-center">
                      <span className="fs-5 me-2">📦</span>
                      <div>
                        <strong>Auto-Accepted:</strong> Please pack these items and assign a delivery partner immediately!
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    {order.items.map(item => (
                      <div key={item.productId} className="small d-flex justify-content-between py-1">
                        <span>{item.name} <span className="text-muted">× {item.quantity}</span></span>
                        <span className="fw-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    {order.status === 'Accepted - Pack Items' && (
                      <button
                        onClick={() => updateStatus(order.id, 'Assigned', 'Ramesh (Laxmi Partner)')}
                        className="btn btn-warning btn-sm rounded-pill px-3 fw-bold shadow-sm"
                      >
                        <Truck size={16} className="me-1 d-inline-block pb-1" /> Assign Ramesh
                      </button>
                    )}
                    {order.status === 'Assigned' && (
                      <button
                        onClick={() => updateStatus(order.id, 'Out for Delivery')}
                        className="btn btn-primary btn-sm rounded-pill px-3 fw-bold"
                      >
                        Ship Order
                      </button>
                    )}
                    {order.status === 'Out for Delivery' && (
                      <button
                        onClick={() => updateStatus(order.id, 'Delivered')}
                        className="btn btn-success btn-sm rounded-pill px-3 fw-bold"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <div className="text-success fw-bold small d-flex align-items-center">
                        <CheckCircle2 size={16} className="me-1" /> Delivery Completed
                      </div>
                    )}
                  </div>

                  {order.deliveryBoy && order.deliveryBoy !== 'Not Assigned' && order.status !== 'Delivered' && (
                    <div className="mt-3 p-2 bg-white rounded-3 small border border-light d-flex align-items-center">
                      <User size={14} className="me-2 text-warning" />
                      Staff: <strong>{order.deliveryBoy}</strong>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders.length === 0 && (
          <div className="text-center py-5 w-100">
            <Clock size={64} className="text-muted opacity-25 mb-3" />
            <h4 className="text-muted">No orders in "{filter}" queue.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManager;
