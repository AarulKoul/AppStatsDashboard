import { DonutChart, Card, Title, Flex, Legend } from "@tremor/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const CategoryWiseChart = () => {
  const [value, setValue] = useState<Vulnerable>();

  const fetchVulnerable = () => {
    return fetch("http://localhost:3000/vulnerable").then((res) => res.json());
  };

  const { data, isLoading } = useQuery({
    queryKey: ["vulnerable"],
    queryFn: fetchVulnerable,
  });
  const valueFormatter = (n: number) =>
    new Intl.NumberFormat("en-IN").format(n).toString();

  return (
    <Card>
      {isLoading ? (
        <div className="w-full h-72 grid place-items-center">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <Title>Vulnerable Apps </Title>
          <Flex
            flexDirection="col"
            justifyContent="center"
            className="mt-4 gap-4"
          >
            <DonutChart
              data={data}
              index="_id"
              category="count"
              className="mt-2 h-64"
              colors={["green", "yellow", "orange", "red"]}
              valueFormatter={valueFormatter}
              showAnimation
              onValueChange={(v) => setValue(v)}
              label={value?.count.toLocaleString("en-IN")}
            />
            <Legend
              categories={[
                "Not Vulnerable",
                "Slightly Vulnerable",
                "Moderately Vulnerable",
                "Highly Vulnerable",
              ]}
              colors={["green", "yellow", "orange", "red"]}
            />
          </Flex>
        </>
      )}
    </Card>
  );
};

export default CategoryWiseChart;
