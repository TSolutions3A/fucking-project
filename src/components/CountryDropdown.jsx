import { useState, useEffect, useRef, useCallback } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import PropTypes from "prop-types";

const CountryDropdown = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [page, setPage] = useState(1);
  const optionsPerPage = 10;
  const observer = useRef();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common).sort();
        setOptions(countryNames);
        setDisplayedOptions(countryNames.slice(0, optionsPerPage));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (search) {
      const filteredOptions = options
        .filter((option) => option.toLowerCase().includes(search.toLowerCase()))
        .sort();
      setDisplayedOptions(filteredOptions.slice(0, optionsPerPage));
    } else {
      setDisplayedOptions(options.slice(0, page * optionsPerPage));
    }
  }, [search, page, options]);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const lastOptionRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="block w-full pl-3 font-['BankGothic'] rounded-md bg-slate-950 border-0 py-4 text-white shadow-sm focus:ring-1 sm:text-sm sm:leading-6 cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaGlobe className="text-gray-400 mr-2" />
            {options.find((option) => option === value) || "Country"}
          </div>
          <MdKeyboardArrowDown className="text-gray-400 text-xl mr-6" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-slate-950 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-white bg-slate-950"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {displayedOptions.map((option, index) => {
            if (displayedOptions.length === index + 1) {
              return (
                <button
                  key={option}
                  ref={lastOptionRef}
                  onClick={() => handleSelect(option)}
                  className="flex items-center px-4 py-2 w-full text-white hover:bg-slate-800"
                >
                  {option === value && <FaGlobe className="mr-2" />}
                  {option}
                </button>
              );
            } else {
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="flex items-center px-4 py-2 w-full text-white hover:bg-slate-800"
                >
                  {option === value && <FaGlobe className="mr-2" />}
                  {option}
                </button>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

CountryDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CountryDropdown;
