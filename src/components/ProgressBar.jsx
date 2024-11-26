import React from "react";

const ProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="relative w-full h-2 bg-slate-800 rounded-full">
      <div
        className="absolute top-0 left-0 h-full bg-dark_lime rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
