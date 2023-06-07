import { MouseEvent, useContext, useState } from "react";

import { ListItemContext } from "@/contexts";
import { IContext } from "@/contexts/ListItemContext/types";

export default function Paginator(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { itemList, setFilters } = useContext(ListItemContext) as IContext;

  const onNext =
    (urlString: string) =>
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      const url: URL = new URL(urlString);
      setCurrentPage((value: number) => value + 1);
      setFilters(Object.fromEntries(url.searchParams));
    };

  const onPrevious =
    (urlString: string) =>
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      const url: URL = new URL(urlString);
      setCurrentPage((value: number) => value - 1);
      setFilters(Object.fromEntries(url.searchParams));
    };

  return (
    <div className="flex items-center justify-center my-4 space-x-2">
      {itemList.previous ? (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
          onClick={onPrevious(itemList.previous)}
        >
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 10l5 5V5l-5 5z" />
          </svg>
        </button>
      ) : (
        <></>
      )}
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none">
        {currentPage}
      </button>
      {itemList.next ? (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
          onClick={onNext(itemList.next)}
        >
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 10l-5 5V5l5 5z" />
          </svg>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
