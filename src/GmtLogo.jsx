import React from 'react';
import './GmtTab.css'; 

const GmtLogo = () => {
  return (
    <div className="os-tab">
      <div className="tab-icon-block">
        <span className="tab-icon-text">GMT</span>
      </div>
      <span className="tab-title">GMT_OS |</span>
      <button className="tab-close-btn">×</button>
    </div>
  );
};

export default GmtLogo;