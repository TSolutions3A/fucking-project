import React from "react";
import logo from "/assets/images/logo.png";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-full px-4 py-4 relative z-10">
      <div className="max-w-8xl mx-auto border-t border-b border-white border-opacity-20 py-4 flex flex-col items-center">
        <div className="bg-[url('/assets/images/footerLogo.svg')] bg-no-repeat bg-center bg-cover w-[15rem] h-[15rem] flex flex-col gap-3 justify-center items-center">
          <div className="flex items-center">
            <img alt="GVV" src={logo} className="h-8 w-auto mr-2" />
            <span className="font-['BankGothic'] text-white text-4xl font-bold">
              GVV
            </span>
          </div>
          <div className="font-bold  text-2xl font-['BankGothic']">
            PARTNERS
          </div>
        </div>
        <div className="text-white text-lg text-center">
          <div className="flex flex-wrap justify-center gap-5 mb-2">
            <a href="#" className="font-['Inter'] text-sm text-gray-300">
              Golden Valley Ventures
            </a>
            <span className="border-r-2 border-gray-400"></span>
            <a href="#" className="font-['Inter'] text-sm text-gray-300">
              3DTV
            </a>
            <span className="border-r-2 border-gray-400"></span>
            <a href="#" className="font-['Inter'] text-sm text-gray-300">
              Illuminates
            </a>
            <span className="border-r-2 border-gray-400"></span>
            <a href="#" className="font-['Inter'] text-sm text-gray-300">
              Laure Media
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between py-4 gap-4">
        <div className="font-['Inter'] text-sm text-gray-300">
          Copyright © 2024 GVV. All Rights Reserved.
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://www.facebook.com/profile.php?id=100091319840760&mibextid=LQQJ4d"
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoFacebookCircle className="text-3xl" />
          </a>
          <a
            href="https://x.com/GVVtoken?t=H67STs-Q2HdYVlffCoP1KQ&s=09"
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitterX className="text-2xl" />
          </a>
          <a
            href="https://discord.gg/T7U6X8S9"
            target="_blank"
            rel="noreferrer"
          >
            <SiDiscord className="text-3xl" />
          </a>
          <a
            href="https://youtube.com/@goldenvalleyventures?si=-ZiLc3Cu49SXq8UO"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube className="text-3xl" />
          </a>
          <a
            href="https://t.me/+OLMo5aHvZf5kMjgx"
            target="_blank"
            rel="noreferrer"
          >
            <BsTelegram className="text-2xl" />
          </a>
        </div>
      </div>

      <img
        src="/assets/images/footerDiagonal.svg"
        className="absolute bottom-0 left-0 z-[-1]"
        alt=""
      />
      <img
        src="/assets/images/footerEclipse.svg"
        className="absolute top-0 right-0 z-[-1] hidden lg:block"
        alt=""
      />
    </div>
  );
};

export default Footer;
