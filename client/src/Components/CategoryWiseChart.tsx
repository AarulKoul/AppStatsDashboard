import { Card, Title, Flex, Bold, Text, BarList, Button } from "@tremor/react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const CategoryWiseChart = () => {
  const [limit, setLimit] = useState(5);

  const fetchCategoryWise = () => {
    return fetch("http://localhost:3000/categories").then((res) => res.json());
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryWise,
  });

  return (
    <Card className="transition-all duration-1000">
      {isLoading ? (
        <div className="w-full h-72 grid place-items-center">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <Title>Category-wise Apps</Title>
          <Flex className="mt-4 pr-4">
            <Text>
              <Bold>Category</Bold>
            </Text>
            <Text>
              <Bold>Apps</Bold>
            </Text>
          </Flex>
          <BarList data={data.slice(0, limit)} className="mt-2 pr-4" />
          <Button
            className="mt-4"
            icon={limit === 5 ? ChevronDown : ChevronUp}
            iconPosition="right"
            variant="light"
            color="gray"
            onClick={() => setLimit((prev) => (prev === 5 ? data.length : 5))}
          >
            {limit === 5 ? "Show more" : "Show less"}
          </Button>
        </>
      )}
    </Card>
  );
};

export default CategoryWiseChart;
