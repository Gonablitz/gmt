import React from 'react';
import './SystemStatus.css';

const SystemStatus = () => {
  return (
    <div className="status-container">
      <div className="status-dot"></div>
      <span className="status-text">OCI_CLOUD_LINK: <span className="status-bold">ACTIVE</span></span>
    </div>
  );
};

export default SystemStatus;