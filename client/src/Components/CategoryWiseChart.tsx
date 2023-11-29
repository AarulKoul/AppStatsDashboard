import { Card, Title, Flex, Bold, Text, BarList } from "@tremor/react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const CategoryWiseChart = () => {
  const fetchCategoryWise = () => {
    return fetch("http://localhost:3000/categories").then((res) => res.json());
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryWise,
  });

  return (
    <Card>
      {isLoading ? (
        <div className="w-full h-72 grid place-items-center">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <Title>Category-wise Apps </Title>
          <Flex className="mt-4">
            <Text>
              <Bold>Category</Bold>
            </Text>
            <Text>
              <Bold>Apps</Bold>
            </Text>
          </Flex>
          <BarList data={data} className="mt-2" showAnimation />
        </>
      )}
    </Card>
  );
};

export default CategoryWiseChart;
