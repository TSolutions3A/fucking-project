import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const generateOptions = (start, end) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push({ value: i * 10, label: `${i * 10}` });
  }
  return options;
};

const CountingDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [maxLoaded, setMaxLoaded] = useState(20);

  const loadMoreOptions = (end) => {
    setDisplayedOptions((prevOptions) => [
      ...prevOptions,
      ...generateOptions(maxLoaded + 1, end || maxLoaded + 20),
    ]);
    setMaxLoaded(end || maxLoaded + 20);
  };

  useEffect(() => {
    setDisplayedOptions(generateOptions(1, 20));
  }, []);

  useEffect(() => {
    const selectedValueOption = Math.ceil(value / 10);
    if (selectedValueOption > maxLoaded) {
      loadMoreOptions(selectedValueOption);
    }
  }, [value, maxLoaded]);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleToggle}
        className="flex justify-center w-full h-12 items-center md:h-16 pl-3 font-['BankGothic'] rounded-xl bg-slate-800 border-0 text-white shadow-sm focus:ring-1 sm:text-sm sm:leading-6 cursor-pointer"
      >
        <div className="flex justify-center items-center w-full">
          <div className="font-['BankGothic'] text-lg">
            {displayedOptions.find((option) => option.value === value)?.label ||
              value ||
              "10"}
          </div>
          <MdKeyboardArrowDown className="text-gray-400 text-xl ml-2" />
        </div>
      </button>
      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full bg-slate-950 rounded-md shadow-lg max-h-60 overflow-y-auto"
          onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            if (scrollHeight - scrollTop === clientHeight) {
              loadMoreOptions();
            }
          }}
        >
          {displayedOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center px-4 py-2 w-full text-white hover:bg-slate-800"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountingDropdown;
