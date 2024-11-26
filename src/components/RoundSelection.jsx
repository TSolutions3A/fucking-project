import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { navData } from "./navbar/navData";
import { Link } from "react-router-dom";

const RoundSelection = ({ show, onClose }) => {
    const [rounds, setRounds] = useState(navData[1].dropdown);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    show && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-20"
        onClick={handleOverlayClick}
      >
        <div className="text-center bg-slate-900 p-6 rounded-lg shadow-lg w-1/3 z-50">
          <h2 className="text-xl font-bold mb-4">Select a Sales Round</h2>
          <ul>
            {rounds.map((option, index) => (
              <Link to={option.href} key={index}>
                <button
                  className="w-full py-3 px-4 mb-4 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
                >
                  {option.name}
                </button>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

RoundSelection.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoundSelection;
