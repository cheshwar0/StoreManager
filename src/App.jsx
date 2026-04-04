// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Billing from './pages/Billing';
import Shop from './pages/Shop';
import CustomerCheckout from './pages/CustomerCheckout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import OrdersManager from './pages/OrdersManager';
import CustomerProfile from './pages/CustomerProfile';
import { InventoryProvider } from './context/InventoryContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading, hasRole } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (roles && !hasRole(roles)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <Router>
          <div className="bg-light min-vh-100 font-sans pb-5">
            <Navigation />
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Admin & Staff Routes */}
              <Route path="/" element={<PrivateRoute roles={['Admin', 'Staff']}><Dashboard /></PrivateRoute>} />
              <Route path="/inventory" element={<PrivateRoute roles={['Admin', 'Staff']}><Inventory /></PrivateRoute>} />
              <Route path="/billing" element={<PrivateRoute roles={['Admin', 'Staff']}><Billing /></PrivateRoute>} />
              <Route path="/orders-manage" element={<PrivateRoute roles={['Admin', 'Staff', 'Delivery']}><OrdersManager /></PrivateRoute>} />
              
              {/* Customer Routes */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkout" element={<CustomerCheckout />} />
              <Route path="/history" element={<OrderHistory />} />
              
              {/* Universal Auth Routes */}
              <Route path="/profile" element={<PrivateRoute><CustomerProfile /></PrivateRoute>} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
