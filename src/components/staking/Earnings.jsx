import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Earnings = ({ earnings }) => {
  return (
    <div className="container mx-auto py-4">
      {earnings.map((item, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-center gap-4 items-center md:justify-between earning rounded-2xl p-6 mb-4 shadow-lg"
        >
          <div className="flex gap-5">
            <div className="font-['Inter'] text-gray-400 text-sm md:text-xl">
              {item.status}
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-orange-700">
              {item.earning.startsWith("+") ? <FaArrowUp /> : <FaArrowDown />}
              {item.earning}
            </div>
          </div>
          <div className="font-['BankGothic'] text-3xl font-bold">
            $GVV: {item.balance}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Earnings;
