import { useState, useEffect } from "react";
import ChartFilter from "../components/staking/ChartFilter";
import Earnings from "../components/staking/Earnings";
import TooltipContent from "../components/staking/TooltipContent";
import Cards from "../components/Cards";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cards, data, earnings } from "../components/staking/data";
import ServiceNotAvailable from "../components/ServiceNotAvailable";
import StakingChart from "../components/StakingChart";

const Staking = () => {
  const [filter, setFilter] = useState("month");
  const [chartData, setChartData] = useState([]);
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

  useEffect(() => {
    const generateChartData = () => {
      const now = new Date();
      let data = [];
      switch (filter) {
        case "day":
          for (let i = 0; i < 31; i++) {
            const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
            if (date.getMonth() === now.getMonth()) {
              data.push({
                name: `${i + 1} ${date.toLocaleDateString("en-US", {
                  month: "short",
                })}`,
                uv: Math.floor(Math.random() * 1000),
                timestamp: date,
              });
            }
          }
          break;
        case "week":
          for (let i = 0; i < 5; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() - now.getDay() + i * 7);
            data.push({
              name: `${date.getDate()} ${date.toLocaleDateString("en-US", {
                month: "short",
              })} ${date.getFullYear()}`,
              uv: Math.floor(Math.random() * 10000),
              timestamp: date,
            });
          }
          break;
        case "month":
          for (let i = 0; i < 12; i++) {
            const date = new Date(now.getFullYear(), i, 1);
            data.push({
              name: `${date.toLocaleDateString("en-US", {
                month: "short",
              })} ${date.getFullYear()}`,
              uv: Math.floor(Math.random() * 30000),
              timestamp: date,
            });
          }
          break;
        case "year":
          for (let i = now.getFullYear() - 5; i <= now.getFullYear(); i++) {
            data.push({
              name: `${i}`,
              uv: Math.floor(Math.random() * 50000),
              timestamp: new Date(i, 0, 1),
            });
          }
          break;
        default:
          break;
      }
      setChartData(data);
    };

    generateChartData();
  }, [filter]);

  return (
    <div className="w-full lg:max-w-8xl p-4 md:mx-auto">
      <h2 className="font-['BankGothic'] text-4xl md:text-6xl font-bold mt-6 mb-10 md:mt-16">
        $GVV Overview
      </h2>
      <Cards cards={cards} />
      <div className="flex flex-wrap bg-slate-900 mt-12 rounded-xl">
        {!isStakingAvailable ? (
          <div className="w-full p-6 md:p-12 h-80 md:h-96 flex flex-col text-center justify-center items-center">
            <ServiceNotAvailable />
          </div>
        ) : (
          <>
            {" "}
            <div className="w-full md:w-[calc(40%-0.75rem)] p-4">
              <StakingChart data={data} />
            </div>
            <div className="w-full md:w-[calc(60%-0.75rem)] p-4 md:p-8">
              <h2 className="font-['Inter'] text-gray-300 text-xl md:text-2xl ">
                $GVV STAKING Account BALANCE
              </h2>
              <h2 className="font-['BankGothic'] text-2xl md:text-4xl my-4 md:my-6 font-bold ">
                $GVV 500,000
              </h2>
              <Earnings earnings={earnings} />
              <div className="flex flex-wrap items-center justify-between gap-5">
                <button className="font-['BankGothic'] text-white font-bold rounded-lg bg-blue-950 opacity-70 w-full md:w-[calc(50%-0.75rem)] p-3">
                  STAKE $GVV
                </button>
                <button className="font-['BankGothic'] text-white font-bold rounded-lg bg-dark_blue w-full md:w-[calc(50%-0.75rem)] p-3">
                  WITHDRAW $GVV
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="bg-slate-900 h-full rounded-xl p-4 mt-4 mb-4 md:mb-8 md:mt-12">
        <ChartFilter filter={filter} setFilter={setFilter} />
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}`} />
            <Tooltip content={<TooltipContent />} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="blue"
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Staking;
