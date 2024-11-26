import React from "react";

const TooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { uv, timestamp } = payload[0].payload;
    return (
      <div className="bg-slate-950 text-white p-4 rounded-lg shadow-lg">
        <p className="font-semibold">${uv}</p>
        <p>{`${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`}</p>
      </div>
    );
  }
  return null;
};

export default TooltipContent;
