// src/pages/Inventory.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Minus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Spinner from '../components/Spinner';
import { useInventory } from '../context/InventoryContext';

const Inventory = () => {
  const { products, loading, error, updateStock } = useInventory();
  const [updatingId, setUpdatingId] = useState(null);

  const handleAdjustStock = async (id, currentStock, amount) => {
    const newStock = Math.max(0, currentStock + amount);
    setUpdatingId(id);
    try {
      updateStock(id, newStock);
    } catch (err) {
      alert('Failed to update stock.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Spinner />;
  if (error)   return <div className="container mt-5 text-center alert alert-danger">{error}</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mt-4 pb-5">
      <header className="mb-5 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-4">
        <div>
          <h1 className="fw-black mb-1 display-6 tracking-tight text-laxmi-green">Sri Lakshmi Inventory</h1>
          <div className="d-flex align-items-center gap-2 opacity-75">
             <img src="/images/storeking_club_logo.png" alt="StoreKing" style={{ height: '14px' }} />
             <span className="smallest text-uppercase fw-bold text-sk-blue">Official StoreKing CLUB Partner</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="bg-white p-2 px-3 rounded-4 shadow-sm border border-sk-blue border-opacity-10 d-flex align-items-center">
             <div className="bg-success rounded-circle me-3" style={{ width: '10px', height: '10px' }}></div>
             <span className="smallest fw-bold text-uppercase tracking-widest text-muted">System Sync: OK</span>
          </div>
        </div>
      </header>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase fw-bold">
                <th className="px-4 py-3">Product Info</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Unit Price</th>
                <th className="px-4 py-3 text-center">Live Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-end">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {products.map((item) => {
                  const isLowStock = item.stock < 50;
                  return (
                    <motion.tr
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={isLowStock ? 'bg-danger bg-opacity-10 border-danger' : ''}
                    >
                      <td className="px-4 py-3">
                        <div className="fw-bold text-dark">{item.name}</div>
                        <div className="text-muted smallest">ID: {item.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 rounded-pill px-3">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 fw-semibold">₹{item.price}</td>
                      <td className="px-4 py-3">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                          <button
                            disabled={updatingId === item.id}
                            onClick={() => handleAdjustStock(item.id, item.stock, -10)}
                            className="btn btn-sm btn-outline-danger rounded-circle p-1 d-flex align-items-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={`fw-bold fs-5 ${isLowStock ? 'text-danger' : 'text-dark'}`}>
                            {item.stock}
                          </span>
                          <button
                            disabled={updatingId === item.id}
                            onClick={() => handleAdjustStock(item.id, item.stock, 10)}
                            className="btn btn-sm btn-outline-success rounded-circle p-1 d-flex align-items-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {isLowStock ? (
                          <div className="d-flex align-items-center text-danger fw-semibold small">
                            <AlertTriangle size={14} className="me-1" /> Critical Restock
                          </div>
                        ) : (
                          <div className="d-flex align-items-center text-success fw-semibold small">
                            <CheckCircle2 size={14} className="me-1" /> Optimal Stock
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-light btn-sm text-primary fw-bold">Manage</button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Inventory;
