// src/pages/CustomerProfile.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, ShoppingCart, ReceiptText, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-5 pb-5 max-w-2xl mx-auto" style={{ maxWidth: '800px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
      >
        {/* Profile Header Background */}
        <div className="bg-success pt-5 pb-4 px-4 text-center text-white position-relative">
          <div className="position-absolute top-0 end-0 p-3">
             <ShieldCheck size={24} className="opacity-50" />
          </div>
          <div className="bg-white bg-opacity-25 rounded-circle p-4 d-inline-flex mb-3 shadow-sm border border-light border-opacity-25">
             <User size={60} />
          </div>
          <h2 className="fw-bold mb-1">{user.name}</h2>
          <p className="opacity-75 small mb-0 text-uppercase tracking-widest fw-bold">{user.role} Account</p>
        </div>

        <div className="card-body p-4 p-md-5 bg-white">
          <h5 className="fw-bold mb-4 text-muted small text-uppercase tracking-wider font-sans">Personal Information</h5>
          
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="d-flex align-items-center p-3 bg-light rounded-4 shadow-sm">
                <div className="bg-white p-2 rounded-circle shadow-sm me-3 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <small className="text-muted d-block fw-bold" style={{ fontSize: '0.7rem' }}>EMAIL ADDRESS</small>
                  <span className="fw-bold text-dark">{user.email}</span>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex align-items-center p-3 bg-light rounded-4 shadow-sm">
                <div className="bg-white p-2 rounded-circle shadow-sm me-3 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <small className="text-muted d-block fw-bold" style={{ fontSize: '0.7rem' }}>MOBILE NUMBER</small>
                  <span className="fw-bold text-dark">{user.phone || 'Not added'}</span>
                </div>
              </div>
            </div>
          </div>

          <h5 className="fw-bold mb-4 text-muted small text-uppercase tracking-wider font-sans">Quick Actions</h5>
          
          <div className="d-flex flex-column flex-md-row gap-3">
            {user.role === 'Customer' ? (
              <>
                <Link to="/history" className="btn btn-outline-dark flex-fill rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center transition-all hover-shadow">
                  <ReceiptText size={18} className="me-2 text-primary" /> Track My Orders
                </Link>
                <Link to="/shop" className="btn btn-success flex-fill rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center shadow-sm">
                  <ShoppingCart size={18} className="me-2" /> Continue Shopping
                </Link>
              </>
            ) : (
              <Link to="/" className="btn btn-dark flex-fill rounded-pill py-3 fw-bold shadow-sm d-flex justify-content-center align-items-center">
                 Access Portal Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="card-footer bg-light p-4 border-0 d-flex justify-content-center">
           <button onClick={handleLogout} className="btn btn-link text-danger fw-bold text-decoration-none shadow-none flex-fill p-2">
              Sign Out Securely
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerProfile;
