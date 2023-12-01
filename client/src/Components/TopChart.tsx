import { useState } from "react";
import TopFree from "./TopFree";
import TopPaid from "./TopPaid";

import { Card, SearchSelect, SearchSelectItem, Title } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";

const tabs = [
  { name: "Top Free", Component: TopFree },
  { name: "Top Paid", Component: TopPaid },
];
const TopChart = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [category, setCategory] = useState("All");

  const fetchAllCategories = () =>
    fetch("http://localhost:3000/all-categories").then((res) => res.json());

  const { data, isLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: fetchAllCategories,
  });

  return (
    <Card className="space-y-6">
      <div>
        <Title className=" mb-3">
          {activeTab.name}{" "}
          <span className="text-gray-500 font-semibold text-lg">
            {category === "All" ? "" : `> ${category}`}
          </span>
        </Title>
        <div className="flex flex-row justify-between">
          <div className="flex gap-5">
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
          <div className="max-w-sm">
            {!isLoading ? (
              <SearchSelect
                // className="w-1/4"
                placeholder="Select Category"
                enableClear={false}
                value={category}
                onValueChange={setCategory}
              >
                <SearchSelectItem className="cursor-pointer" value="All">
                  All
                </SearchSelectItem>
                {data.map((category: string) => (
                  <SearchSelectItem
                    className="cursor-pointer"
                    key={category}
                    value={category}
                  >
                    {category}
                  </SearchSelectItem>
                ))}
              </SearchSelect>
            ) : null}
          </div>
        </div>
      </div>
      <activeTab.Component category={category} />
    </Card>
  );
};

export default TopChart;
