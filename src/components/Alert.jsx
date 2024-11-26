import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";

const Alert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); 
  };

  return (
    <div
      className={`fixed sm:left-0 md:left-auto right-0 top-5 md:right-5 z-50 flex items-center gap-5 md:gap-10 border ${
        type === "success"
          ? "bg-green-500 border-green-500"
          : "bg-red-500 border-red-500"
      } text-white p-3 md:px-6 md:py-5 rounded-xl shadow-md bg-opacity-30 drop-shadow-2xl transform transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      role="alert"
    >
      <div className="flex justify-center items-center gap-2">
        {type === "success" ? (
          <IoCheckmarkCircle className="text-green-500 md:text-3xl" />
        ) : (
          <IoCloseCircle className="text-red-600 text-6xl md:text-3xl" />
        )}
        <span className="block sm:inline text-xl text-white">{message}</span>
      </div>
      <button className="text-4xl md:text-3xl text-white" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
