import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center space-x-4 bg-yellow-400 p-4 rounded-lg text-black text-xl font-bold font-['BankGothic']">
      <div className="countdown-item flex flex-col items-center">
        <span className="text-4xl">{timeLeft.days || "0"}</span>
        <span>Days</span>
      </div>
      <div className="countdown-item flex flex-col items-center">
        <span className="text-4xl">{timeLeft.hours || "0"}</span>
        <span>Hours</span>
      </div>
      <div className="countdown-item flex flex-col items-center">
        <span className="text-4xl">{timeLeft.minutes || "0"}</span>
        <span>Minutes</span>
      </div>
      <div className="countdown-item flex flex-col items-center">
        <span className="text-4xl">{timeLeft.seconds || "0"}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  targetDate: PropTypes.instanceOf(Date).isRequired,
};

export default Countdown;
