import { MouseEvent, useContext, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { ListItemContext } from "@/components/lib/ListItem/context";

export default function Paginator(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, setFilters } = useContext(ListItemContext);

  const onPageChange =
    (urlString: string, step: number) =>
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      const url: URL = new URL(urlString);
      setCurrentPage((value: number) => value + step);
      setFilters(Object.fromEntries(url.searchParams));
    };

  return (
    <div className="flex items-center justify-center my-4 space-x-2">
      {data.previous ? (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
          onClick={onPageChange(data.previous, -1)}
        >
          <ArrowLeftIcon height={12} />
        </button>
      ) : (
        <span className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none">
          <XMarkIcon height={12} />
        </span>
      )}
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none">
        {currentPage}
      </button>
      {data.next ? (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
          onClick={onPageChange(data.next, 1)}
        >
          <ArrowRightIcon height={12} />
        </button>
      ) : (
        <span className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none">
          <XMarkIcon height={12} />
        </span>
      )}
    </div>
  );
}
