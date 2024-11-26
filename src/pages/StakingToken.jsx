import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { data, cards } from "../components/staketoken/data";
import StakeForm from "../components/staketoken/StakeForm";
import UserProfile from "../components/staketoken/UserProfile";
import ServiceNotAvailable from "../components/ServiceNotAvailable";
import StakingChart from "../components/StakingChart";

const StakingToken = () => {
  const email = "xxx@gmail.com";
  const code = "0xf2D4...6f91";
  const [selectedValue, setSelectedValue] = useState("");
  const [isStakingAvailable, setIsStakingAvailable] = useState(false);

  useEffect(() => {
    // Replace this with the actual logic to check if staking is available
    const checkStakingAvailability = async () => {
      const response = await fetch("/api/check-staking-status");
      const data = await response.json();
      setIsStakingAvailable(data.isAvailable);
    };

    checkStakingAvailability();
  }, []);

  return (
    <div className="w-full lg:max-w-8xl p-4 md:mx-auto">
      <h2 className="font-['BankGothic'] text-4xl md:text-6xl font-bold mt-6 mb-10 md:mt-16">
        $GVV Overview
      </h2>
      <Cards cards={cards} />
      <div className="flex flex-wrap gap-5 mt-12">
        <div
          className="w-full md:w-[calc(50%-0.75rem)] bg-slate-900 rounded-3xl
        p-6 md:p-8"
        >
          {isStakingAvailable ? (
            <StakeForm
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          ) : (
            <div className="h-80 md:h-full flex flex-col text-center justify-center items-center">
              <ServiceNotAvailable />
            </div>
          )}
        </div>
        <div className="flex w-full flex-wrap-reverse md:w-[calc(50%-0.75rem)] bg-slate-900 rounded-3xl">
          <UserProfile email={email} code={code} />
          <div className="w-full md:w-[calc(50%-0.75rem)] bg-slate-900 rounded-xl p-4">
            <StakingChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingToken;
