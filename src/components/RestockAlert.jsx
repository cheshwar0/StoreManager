// src/components/RestockAlert.jsx
import React, { useState } from 'react';

const RestockAlert = ({ productName, message, urgent }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    // Real world scenario: this would make an API call to a supplier API.
  };

  if (accepted) {
    return (
      <div className="alert alert-success d-flex align-items-center mb-0" role="alert">
        <div>
          <strong>✅ Restock Order Placed</strong> for {productName}!
        </div>
      </div>
    );
  }

  return (
    <div className={`alert ${urgent ? 'alert-danger' : 'alert-success'} d-flex justify-content-between align-items-center mb-0`} role="alert">
      <div>
        <strong>{productName}:</strong> {message}
      </div>
      {urgent && (
        <button className="btn btn-sm btn-danger ms-3 shadow-sm" onClick={handleAccept}>
          Accept Suggestion
        </button>
      )}
    </div>
  );
};

export default RestockAlert;
