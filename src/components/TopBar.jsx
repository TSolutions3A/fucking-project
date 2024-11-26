import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import GoogleTranslate from "./GoogleTranslate";

const TopBar = () => {

  return (
    <div className="w-full bg-gradient-to-r from-dark_blue to-dark_yellow">
      <div className="mx-auto max-w-8xl relative flex justify-between h-11 items-center px-2 sm:px-6 lg:px-8">
        <marquee className='text-white text-xs  lg:text-base font-["Inter"]'>
          $GVV serves a multiple purpose as a digital asset and equity share
        </marquee>
        <div className="relative hidden lg:inline-block">
          {/* <select
            name="lang"
            className="block w-full appearance-none rounded-3xl bg-white bg-opacity-25 py-1 px-3 text-sm text-black cursor-pointer"
            id="lang"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">ENG</option>
            <option value="fr">FRENCH</option>
            <option value="es">SPANISH</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs px-1 text-black">
            <SlArrowDown />
          </div> */}
          <GoogleTranslate />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
