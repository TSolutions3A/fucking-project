import { useState } from "react";
import { FaPlus, FaWindowMinimize } from "react-icons/fa";

const Count = ({ count, setCount }) => {
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && (value === "" || value[0] !== "0")) {
      setCount(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleInputBlur = () => {
    if (count === "" || count < 1) {
      setCount(1);
    }
  };

  return (
    <div className="flex items-start w-full lg:w-fit font-['BankGothic']">
      <div className="flex items-center w-full justify-between h-[76px] gap-3 bg-[#050B21] border border-[#ffffff0c] rounded-lg p-3">
        <button
          onClick={handleDecrement}
          className={`p-4 px-8 flex items-center justify-center ${
            count === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={count === 1}
        >
          <FaWindowMinimize />
        </button>
        <input
          type="text"
          value={count}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="bg-[#FFFFFF0D] bg-opacity-10 text-xl font-bold  outline-none text-center rounded-xl text-[#ffffff] w-20 p-4"
        />
        <button
          onClick={handleIncrement}
          className="p-4 px-8 flex items-center justify-center cursor-pointer"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Count;
