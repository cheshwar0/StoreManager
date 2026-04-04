// src/components/Navigation.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Boxes, ShoppingCart, Truck, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null; // Or show a minimal home-only nav

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-laxmi-green shadow-sm mb-4 py-3 sticky-top border-bottom border-white border-opacity-10" style={{ zIndex: 1050 }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold d-flex flex-column align-items-start" to={user.role === 'Customer' ? '/shop' : '/'}>
           <div className="d-flex align-items-center mb-0">
              <span className="fs-4 tracking-tight">Sri Lakshmi Kirana Store</span>
           </div>
           <div className="d-flex align-items-center opacity-75" style={{ marginTop: '-4px' }}>
              <div className="bg-white text-laxmi-green px-2 py-0 rounded-1 me-2 fw-black" style={{ fontSize: '0.6rem' }}>SK</div>
              <span className="smallest text-uppercase fw-black tracking-widest text-white" style={{ fontSize: '0.65rem' }}>Powered by StoreKing</span>
           </div>
        </NavLink>
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2 align-items-center">
            {hasRole(['Admin', 'Staff']) && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center px-3 rounded-pill transition-all" to="/" activeclassname="active">
                    <LayoutDashboard size={18} className="me-2" />
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center px-3 rounded-pill transition-all" to="/inventory" activeclassname="active">
                    <Boxes size={18} className="me-2" />
                    Inventory
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center px-3 rounded-pill transition-all" to="/billing" activeclassname="active">
                    <ReceiptText size={18} className="me-2" />
                    Billing
                  </NavLink>
                </li>
              </>
            )}

            {hasRole(['Admin', 'Staff', 'Delivery']) && (
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center px-3 rounded-pill transition-all" to="/orders-manage" activeclassname="active">
                  <Truck size={18} className="me-2" />
                  Orders
                </NavLink>
              </li>
            )}

            {hasRole(['Customer']) && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center px-3 rounded-pill transition-all" to="/shop" activeclassname="active">
                    <ShoppingCart size={18} className="me-2" />
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center px-3 rounded-pill transition-all" to="/history" activeclassname="active">
                    <ReceiptText size={18} className="me-2" />
                    History
                  </NavLink>
                </li>
              </>
            )}

            <div className="ms-lg-4 border-start border-secondary border-opacity-25 ps-lg-4 d-flex align-items-center gap-3 mt-3 mt-lg-0">
               <NavLink to="/profile" className="d-flex align-items-center text-decoration-none text-white opacity-75 hover-opacity-100 transition-all p-1 rounded-3">
                 <div className="bg-light bg-opacity-10 text-white rounded-circle d-flex justify-content-center align-items-center me-2" style={{ width: '38px', height: '38px' }}>
                    <User size={18} />
                 </div>
                 <div className="d-flex flex-column text-start d-none d-lg-flex me-2">
                    <span className="small fw-bold lh-1 mb-1">{user.name}</span>
                    <span className="text-success fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>{user.role}</span>
                 </div>
               </NavLink>
               <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-circle p-2 d-flex align-items-center" title="Sign Out">
                  <LogOut size={16} />
               </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
