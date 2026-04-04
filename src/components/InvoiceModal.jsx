// src/components/InvoiceModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Receipt, Printer } from 'lucide-react';

const InvoiceModal = ({ order, onClose }) => {
  return (
    <AnimatePresence>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3" 
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1060 }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="w-100"
          style={{ maxWidth: '450px' }}
        >
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white">
            <div className="modal-header bg-success text-white p-4 border-0">
              <div className="d-flex align-items-center">
                <CheckCircle2 className="me-3" size={32} />
                <div>
                  <h4 className="fw-bold mb-0 lh-1">Sale Complete</h4>
                  <small className="opacity-75">Thank you for your purchase!</small>
                </div>
              </div>
              <button onClick={onClose} className="btn-close btn-close-white shadow-none"></button>
            </div>
            
            <div className="modal-body p-4 bg-white">
              <div className="text-center mb-4">
                 <Receipt size={40} className="text-success mb-2 opacity-50" />
                 <h5 className="fw-bold mb-0">Sri Lakshmi Kirana Store</h5>
                 <small className="text-muted opacity-75">Order ID: #{Math.random().toString(36).substr(2, 6).toUpperCase()}</small>
                 <div className="text-muted smallest mt-1">{order.date}</div>
              </div>

              <div className="border-bottom border-dashed pb-3 mb-3">
                 <table className="table table-borderless table-sm mb-0">
                    <thead>
                      <tr className="smallest text-muted text-uppercase">
                        <th className="px-0">Item</th>
                        <th className="text-center">Qty</th>
                        <th className="text-end px-0">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map(item => (
                        <tr key={item.id || item.name} className="small">
                          <td className="px-0 fw-bold text-dark">{item.name}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end px-0 fw-bold">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>

              <div className="d-flex flex-column gap-2 mb-4">
                 <div className="d-flex justify-content-between small">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-bold">₹{order.totals.subtotal.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="d-flex justify-content-between small">
                    <span className="text-muted">GST (5%)</span>
                    <span className="fw-bold text-dark">₹{order.totals.tax.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="d-flex justify-content-between mt-2 border-top pt-2">
                    <h5 className="fw-bold text-dark mb-0">Paid Amount</h5>
                    <h5 className="fw-bold text-success mb-0">₹{order.totals.total.toLocaleString('en-IN')}</h5>
                 </div>
              </div>

              <div className="row g-2">
                 <div className="col-6">
                    <button className="btn btn-outline-dark w-100 rounded-pill py-2 small fw-bold d-flex align-items-center justify-content-center">
                       <Printer size={16} className="me-2" /> Print
                    </button>
                 </div>
                 <div className="col-6">
                    <button onClick={onClose} className="btn btn-dark w-100 rounded-pill py-2 small fw-bold">
                       New Sale
                    </button>
                 </div>
              </div>
            </div>

            <div className="modal-footer bg-light p-3 border-0 justify-content-center">
               <small className="text-muted smallest text-uppercase tracking-widest fw-bold opacity-50">Powered by Antigravity POS</small>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InvoiceModal;
