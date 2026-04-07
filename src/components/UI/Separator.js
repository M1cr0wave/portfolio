import React from 'react';
import './Separator.css';

const Separator = () => {
  return (
    <div className="separator font-serif" role="separator" aria-hidden="true">
      <span className="separator-ornament">&#x2727;</span>
      <span className="separator-ornament">&#x2727;</span>
      <span className="separator-ornament">&#x2727;</span>
    </div>
  );
};

export default Separator;
