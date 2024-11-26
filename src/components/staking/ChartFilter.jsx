import React from "react";

const ChartFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-between flex-wrap gap-4 my-2 md:my-6">
      <h2 className="font-['BankGothic'] font-bold text-xl md:text-4xl">
        REAL ANNUAL PERCENTAGE YIELD
      </h2>
      <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-0">
        {["day", "week", "month", "year"].map((period) => (
          <button
            key={period}
            onClick={() => setFilter(period)}
            className={`py-2 w-16 md:w-20 rounded-2xl md:rounded-lg font-['BankGothic'] font-bold text-xs mdtext-sm ${
              filter === period ? "bg-blue-700" : "bg-blue-950"
            } text-white`}
          >
            {period.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartFilter;
