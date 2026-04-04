import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, colorClass = "primary" }) => {
  const colorMap = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
    warning: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    danger: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card border-0 shadow-sm mb-4 overflow-hidden"
      style={{ 
        background: colorMap[colorClass] || colorMap.primary,
        borderRadius: '16px',
        color: 'white'
      }}
    >
      <div className="card-body p-4 position-relative">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0 text-white-50 fw-semibold text-uppercase small tracking-wider">{title}</p>
            <h2 className="mb-0 fw-bold mt-1 display-6">{value}</h2>
          </div>
          <div className="bg-white bg-opacity-25 rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
             {/* Simple icon fallback or passed icon component */}
             <span className="fs-2">{icon}</span>
          </div>
        </div>
        
        {/* Decorative background circle */}
        <div className="position-absolute top-0 end-0 bg-white bg-opacity-10 rounded-circle" style={{ width: '100px', height: '100px', marginRight: '-30px', marginTop: '-30px' }}></div>
      </div>
    </motion.div>
  );
};

export default StatCard;
