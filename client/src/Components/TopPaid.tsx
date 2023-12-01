import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { App } from "../types/app";

type FetchResponse = {
  apps: App[];
  total: number;
};

const TopPaid = ({ category }: { category: string }) => {
  const [page, setPage] = useState(0);
  const fetchTopPaid = (page = 0, category = "All") => {
    return fetch(
      `http://localhost:3000/top-paid?page=${page}&category=${category}`
    ).then((res) => res.json());
  };

  const { data, isLoading, isPlaceholderData } = useQuery<FetchResponse, Error>(
    {
      queryKey: ["top-paid", page, category],
      queryFn: () => fetchTopPaid(page, category),
      placeholderData: keepPreviousData,
    }
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const start = page * 10 + 1;
  const end = start - 1 + 10;
  const totalPages = Math.ceil((data?.total ?? 0) / 10);

  return (
    <>
      {!isPlaceholderData && isLoading ? (
        <div className="w-full h-72 grid place-items-center">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      ) : (
        <div>
          <Table className="min-w-full">
            <TableHead>
              <TableRow className="text-left">
                <TableHeaderCell className="py-1"></TableHeaderCell>
                <TableHeaderCell className="py-1">Name</TableHeaderCell>
                {category === "All" ? (
                  <TableHeaderCell className="py-1">Category</TableHeaderCell>
                ) : null}
                <TableHeaderCell className="py-1">Rating</TableHeaderCell>
                <TableHeaderCell className="py-1">Downloads</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody
              className={
                isPlaceholderData ? "opacity-25 pointer-events-none" : ""
              }
            >
              {data?.apps.map((item, index) => (
                <React.Fragment key={item["App Id"]}>
                  <TableRow className="hover:bg-gray-100">
                    <TableCell className="py-3 px-4">
                      {start + index}.
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {item["App Name"]}
                    </TableCell>
                    {category === "All" ? (
                      <TableCell className="py-3 px-4">
                        <Text>{item["Category"]}</Text>
                      </TableCell>
                    ) : null}
                    <TableCell className="py-3 px-4">
                      <Text>
                        {Number(item["Rating"]).toFixed(1)}{" "}
                        <span className="text-sm">★</span>
                      </Text>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {item["Installs"]}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-1 items-center justify-between  border-t border-gray-200 bg-white px-4 py-1 mt-3">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{start}</span> to{" "}
                <span className="font-medium">{end}</span> of{" "}
                <span className="font-medium">{data?.total}</span> results
              </p>
            </div>
            <ReactPaginate
              breakLabel="..."
              previousLabel={
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              }
              nextLabel={
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              }
              previousAriaLabel="Previous"
              nextAriaLabel="Next"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm mt-4"
              activeClassName="relative z-10 inline-flex items-center ring-1 ring-blue-500 bg-blue-100 text-blue-500 px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              previousClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabledClassName="text-gray-200 hover:bg-transparent"
              disabledLinkClassName="cursor-not-allowed"
              breakClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
              nextClassName="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TopPaid;
