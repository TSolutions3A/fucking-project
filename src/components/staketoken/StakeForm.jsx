import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import CountingDropdown from "./CountingDropdown";

const StakeForm = ({ selectedValue, setSelectedValue }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && (value === "" || value[0] !== "0")) {
      setSelectedValue(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleInputBlur = () => {
    if (selectedValue === "" || selectedValue < 1) {
      setSelectedValue(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your Logc
  };

  return (
    <>
      <h2 className="font-['BankGothic'] text-2xl md:text-4xl font-bold">
        STAKE $GVV
      </h2>
      <h2 className="font-['Inter'] text-gray-300 text-lg my-4 md:text-xl">
        Type or Select Stake Amount ( $GVV Minimum )
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-5">
            <div className="relative w-full sm:w-[65%]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaDollarSign />
              </div>
              <input
                id="token"
                name="token"
                type="number"
                placeholder="ENTER OR SELECT AMOUNT TO STAKED"
                required
                value={selectedValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="block w-full h-14 md:h-16 pl-9 font-['BankGothic'] rounded-xl bg-slate-950 border-0 py-3 text-white shadow-sm placeholder:text-gray-200 focus:ring-1 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-center w-full sm:w-[35%] gap-2 sm:gap-5">
              <CountingDropdown
                value={selectedValue}
                onChange={setSelectedValue}
              />
              <div className="font-['Inter'] text-dark_yellow text-xl sm:text-2xl">
                $GVV
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl font-['BankGothic'] bg-dark_blue px-3 py-3 text-base font-bold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
            >
              STAKE $GVV
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StakeForm;
