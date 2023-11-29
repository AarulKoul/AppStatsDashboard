import { useState } from "react";
import TopFree from "./TopFree";
import TopPaid from "./TopPaid";

const tabs = [
  { name: "Top Free", Component: TopFree },
  { name: "Top Paid", Component: TopPaid },
];
const TopChart = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <>
      <h2 className="font-bold text-2xl mb-3">{activeTab.name}</h2>
      <div className="flex gap-5 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-4 py-1 rounded-full hover:bg-blue-50 ring-1  ${
              activeTab.name === tab.name
                ? "ring-blue-500 text-blue-500 font-semibold bg-blue-100"
                : "ring-slate-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <activeTab.Component />
    </>
  );
};

export default TopChart;
