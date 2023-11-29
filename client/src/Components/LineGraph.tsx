import { AreaChart, Card, CustomTooltipType, Text, Title } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const LineGraph = () => {
  const fetchYearWiseApps = () => {
    return fetch("http://localhost:3000/year-wise-apps").then((res) =>
      res.json()
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["year-wise-apps"],
    queryFn: fetchYearWiseApps,
  });

  const valueFormatter = function (n: number) {
    return new Intl.NumberFormat("us").format(n).toString();
  };

  const customTooltip = ({ payload, active, label }: CustomTooltipType) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        {payload.map((category, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-tremor-content">{label}</p>
            <p className="font-medium text-tremor-content-emphasis">
              {category.payload.total} apps
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      {isLoading ? (
        <div className="w-full h-72 grid place-items-center">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <Title className="text-2xl">
            Total Number of Apps Over the Years
          </Title>
          <Text>Line Graph of total number of apps over the years</Text>
          <AreaChart
            showAnimation
            curveType="natural"
            className="h-80 mt-8"
            yAxisWidth={100}
            showLegend={false}
            data={data}
            colors={["blue"]}
            index="_id"
            categories={["cumulative"]}
            valueFormatter={valueFormatter}
            customTooltip={customTooltip}
          />
        </>
      )}
    </Card>
  );
};

export default LineGraph;
