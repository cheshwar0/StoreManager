import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, TrendingDown } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { calculateAverageSales, getDemandLabel } from '../utils/prediction';
import { SEASONAL_TRENDS, HISTORICAL_DATA } from '../data/seasonalTrends';
import { AlertTriangle, CloudRain, Calendar, Sparkles } from 'lucide-react';

const AIInsights = () => {
  const { products, loading } = useInventory();

  // Computed Insights: Seasonal & Historical
  const proactiveAlerts = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const alerts = [];

    // Check for Seasons
    const currentSeason = SEASONAL_TRENDS.find(s => s.months?.includes(currentMonth));
    if (currentSeason) {
      currentSeason.alerts.forEach(a => {
        alerts.push({ ...a, type: 'Season', season: currentSeason.season, icon: <CloudRain size={18} /> });
      });
    }

    // Check for Upcoming Festivals (within 1 month)
    const upcomingFestival = SEASONAL_TRENDS.find(f => f.festival && (f.month === currentMonth || f.month === currentMonth + 1));
    if (upcomingFestival) {
      upcomingFestival.alerts.forEach(a => {
        alerts.push({ ...a, type: 'Festival', festival: upcomingFestival.festival, icon: <Calendar size={18} /> });
      });
    }

    return alerts;
  }, []);

  // Compute insights locally from product data — no API call needed
  const insights = useMemo(() => {
    if (!products.length) return [];

    return products.map(product => {
      const avg = calculateAverageSales(product.salesHistory);
      const demand = getDemandLabel(avg);
      const hist = HISTORICAL_DATA[product.id] || { trend: 'Stable', lastYearPriceChange: '0%' };

      // Estimate days until stock-out based on average daily sales
      const daysLeft = avg > 0 ? Math.floor(product.stock / avg) : 999;
      const depletionDate = daysLeft < 999
        ? daysLeft <= 0
          ? 'TODAY'
          : `~${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
        : 'Stable Supply';

      // Determine trend from salesHistory (compare first half vs second half)
      const mid = Math.floor(product.salesHistory.length / 2);
      const firstHalf  = product.salesHistory.slice(0, mid).reduce((a, b) => a + b, 0);
      const secondHalf = product.salesHistory.slice(mid).reduce((a, b) => a + b, 0);
      const trend = secondHalf >= firstHalf ? 'Increasing' : 'Decreasing';

      // Status
      let status = 'Good';
      if (product.stock < 10 || daysLeft <= 2) status = 'Critical';
      else if (demand === 'High' && product.stock < 50) status = 'Low';

      return { 
        id: product.id, 
        name: product.name, 
        trend, 
        depletionDate, 
        status, 
        demand, 
        avg: avg.toFixed(1),
        histTrend: hist.lastYearPriceChange 
      };
    })
    // Show most critical first, limit to top 8
    .sort((a, b) => {
      const rank = { Critical: 0, Low: 1, Good: 2 };
      return rank[a.status] - rank[b.status];
    })
    .slice(0, 8);
  }, [products]);

  if (loading) return <div className="text-center py-5 small text-muted">AI is calculating...</div>;

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mt-4">
      <div className="card-header bg-laxmi-green text-white p-4 border-0 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
           <BrainCircuit className="me-3 text-white" size={24} />
           <h5 className="fw-bold mb-0">Sri Lakshmi Smart Advisor</h5>
        </div>
        <div className="d-flex align-items-center opacity-75">
           <span className="smallest text-uppercase fw-black tracking-widest me-2" style={{fontSize: '0.65rem'}}>Technology by</span>
           <img src="/images/storeking_club_logo.png" alt="StoreKing" style={{ height: '14px' }} />
        </div>
      </div>
      <div className="card-body p-4 bg-white">
        
        {/* Proactive Alerts Section */}
        {proactiveAlerts.length > 0 && (
          <div className="mb-5">
            <h6 className="smallest text-sk-blue text-uppercase fw-black mb-3 d-flex align-items-center tracking-widest">
              <Sparkles size={14} className="me-2 text-sk-orange" /> Seasonal Risk Warnings
            </h6>
            <div className="d-flex flex-column gap-3">
               {proactiveAlerts.map((alert, idx) => (
                 <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-3 rounded-4 border-start border-4 ${alert.severity === 'Critical' || alert.severity === 'High' ? 'border-sk-orange bg-sk-orange bg-opacity-10' : 'border-sk-blue bg-sk-blue bg-opacity-5'}`}
                 >
                    <div className="d-flex align-items-start gap-3">
                       <div className={`p-2 rounded-circle ${alert.severity === 'Critical' || alert.severity === 'High' ? 'bg-sk-orange text-white' : 'bg-sk-blue text-white'}`}>
                          {alert.icon}
                       </div>
                       <div>
                          <div className="d-flex align-items-center gap-2 mb-1">
                             <span className="fw-black smallest text-uppercase opacity-75">{alert.type}: {alert.season || alert.festival}</span>
                             <span className={`badge rounded-pill smallest ${alert.severity === 'Critical' ? 'bg-danger' : alert.severity === 'High' ? 'bg-sk-orange' : 'bg-sk-blue'}`}>{alert.severity} RISK</span>
                          </div>
                          <h6 className="fw-bold text-dark mb-1">{alert.product}: {alert.impact}</h6>
                          <p className="smallest text-muted mb-2 lh-sm">{alert.reason}</p>
                          <div className="bg-white p-2 rounded-3 border border-sk-blue border-opacity-10 d-flex align-items-center justify-content-between">
                             <span className="smallest fw-bold italic">💡 Advisor: {alert.advice}</span>
                             <button className="btn btn-sk-blue btn-sm rounded-pill smallest py-1">Stock Up</button>
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        )}

        <h6 className="smallest text-sk-blue text-uppercase fw-black mb-3 d-flex align-items-center tracking-widest mt-4">
           <TrendingUp size={14} className="me-2 text-sk-orange" /> Real-time Stock Predictions
        </h6>
        <p className="text-muted smallest mb-4">Live 7-day velocity check & stock-out risk monitor.</p>

        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0">
            <thead>
              <tr className="smallest text-sk-blue text-uppercase fw-black opacity-50">
                <th>Item</th>
                <th>Velocity</th>
                <th>Last Year</th>
                <th className="text-end">Risk</th>
              </tr>
            </thead>
            <tbody>
              {insights.map(item => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <td className="fw-bold small text-dark">{item.name}</td>
                  <td>
                    <div className="d-flex align-items-center smallest fw-semibold">
                      {item.trend === 'Increasing'
                        ? <TrendingUp  size={14} className="text-danger me-1" />
                        : <TrendingDown size={14} className="text-sk-blue me-1" />}
                      {item.trend}
                    </div>
                  </td>
                  <td className="small text-muted italic smallest">{item.histTrend}</td>
                  <td className="text-end">
                    <span className={`badge rounded-pill smallest py-1 px-3 ${
                      item.status === 'Critical' ? 'bg-danger text-white' :
                      item.status === 'Low'      ? 'bg-sk-orange text-white' :
                                                   'bg-sk-blue bg-opacity-10 text-sk-blue'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
