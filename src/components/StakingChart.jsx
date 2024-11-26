import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const StakingChart = ({ data }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  const renderTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percent = ((value / total) * 100).toFixed(2);

      return (
        <div className="bg-slate-950 text-white p-4 rounded-lg shadow-lg">
          <p className="font-semibold">{name}</p>
          <p>{`${percent}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Tooltip content={renderTooltipContent} />
          <Pie
            data={data}
            innerRadius={"75%"}
            outerRadius={"100%"}
            paddingAngle={1}
            dataKey="value"
          >
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap m-6 gap-4 justify-center">
        {data.map((item, index) => {
          const percent = total
            ? ((item.value / total) * 100).toFixed(0)
            : null;
          return (
            <div
              className={`flex items-center flex-col ${
                index < data.length - 1 ? "border-r border-gray-300 pr-4" : ""
              }`}
              key={index}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <p className="font-['Inter'] font-bold text-xs md:text-base">
                  {`${percent}%`}
                </p>

                <p className="font-['Inter'] font-bold text-xs md:text-base">
                  {item.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StakingChart;
