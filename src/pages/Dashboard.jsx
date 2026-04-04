// src/pages/Dashboard.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingCart, Star, Zap } from 'lucide-react';

import StatCard from '../components/StatCard';
import SalesChart from '../components/SalesChart';
import Spinner from '../components/Spinner';
import AIInsights from '../components/AIInsights';

import { useInventory } from '../context/InventoryContext';
import { calculateAverageSales } from '../utils/prediction';

const Dashboard = () => {
  const { products, loading, error } = useInventory();

  // Memoized derived metrics
  const metrics = useMemo(() => {
    if (!products || !products.length) return null;

    let totalSalesRs = 0;
    let highestQty = 0;
    let topProduct = '';

    const processed = products.map(item => {
      const totalUnits = item.salesHistory.reduce((sum, val) => sum + val, 0);
      const income = totalUnits * item.price;
      totalSalesRs += income;

      if (totalUnits > highestQty) {
        highestQty = totalUnits;
        topProduct = item.name;
      }

      const avgSales = calculateAverageSales(item.salesHistory);
      return {
        ...item,
        avgSales: parseFloat(avgSales.toFixed(1))
      };
    });

    const storeAvgItemsPerDay = (products.reduce((acc, p) => acc + p.salesHistory.reduce((a, b) => a + b, 0), 0) / 7).toFixed(1);

    return {
      totalSalesRs,
      storeAvgItemsPerDay,
      topProduct,
      processedProducts: processed
    };
  }, [products]);

  if (loading) return <Spinner />;
  if (error) return <div className="container mt-5 text-center alert alert-danger">{error}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mt-4"
    >
      <header className="mb-5 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-4">
        <div>
          <h1 className="fw-black mb-1 display-6 tracking-tight text-laxmi-green">Sri Lakshmi</h1>
          <div className="d-flex align-items-center gap-2 opacity-75">
             <div className="bg-sk-blue text-white px-2 py-0 rounded-1 fw-black" style={{ fontSize: '0.65rem' }}>SK</div>
             <span className="smallest text-uppercase fw-bold text-sk-blue">Official StoreKing CLUB Partner</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="bg-white p-2 px-3 rounded-4 shadow-sm border border-sk-blue border-opacity-10 d-flex align-items-center">
             <div className="bg-success rounded-circle me-3" style={{ width: '10px', height: '10px' }}></div>
             <span className="smallest fw-bold text-uppercase tracking-widest text-muted">Operational: Live</span>
          </div>
        </div>
      </header>
      
      {/* KPI Section */}
      <div className="row g-4">
        <div className="col-md-4">
          <StatCard 
            title="Total Revenue" 
            value={metrics ? `₹${metrics.totalSalesRs.toLocaleString('en-IN')}` : '₹0'} 
            icon={<TrendingUp size={28} />} 
            colorClass="primary" 
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="Avg Items / Day" 
            value={metrics ? metrics.storeAvgItemsPerDay : '0'} 
            icon={<ShoppingCart size={28} />} 
            colorClass="success" 
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="Top Seller" 
            value={metrics ? metrics.topProduct : 'N/A'} 
            icon={<Star size={28} />} 
            colorClass="warning" 
          />
        </div>
      </div>

      <div className="row mt-5 g-4">
        {/* Sales Trends Section */}
        <div className="col-lg-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card border-0 shadow-sm h-100 rounded-4"
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-4 d-flex align-items-center text-laxmi-green">
              <ShoppingCart className="me-2" size={24} />
              Sri Lakshmi • <span className="ms-2 opacity-75 small text-sk-blue fw-black text-uppercase">StoreKing CLUB</span>
            </h4>       <select className="form-select form-select-sm border-0 bg-light w-auto">
                   <option>Last 7 Days</option>
                </select>
              </div>
              <div style={{ minHeight: '350px' }}>
                 <SalesChart />
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Restock & Prediction Section */}
        <div className="col-lg-4">
           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
           >
             <AIInsights />
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
