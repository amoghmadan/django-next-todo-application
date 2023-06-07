import { MutableRefObject, useContext, useRef } from "react";

import { ListItemContext } from "@/contexts";
import { IContext } from "@/contexts/ListItemContext/types";

export default function Filter(): JSX.Element {
  const statusRef: MutableRefObject<HTMLSelectElement> = useRef(null!);
  const { filters, setFilters } = useContext(ListItemContext) as IContext;

  const updateFilters = (): void => {
    if (statusRef.current.value == "-1") {
      delete filters.status;
      setFilters({ ...filters });
    } else {
      setFilters({ ...filters, status: statusRef.current.value });
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="inline-block relative">
        <select
          name="status"
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          defaultValue={-1}
          ref={statusRef}
          onChange={updateFilters}
        >
          <option value={-1}>All</option>
          <option value={0}>Pending</option>
          <option value={1}>Work in Progress</option>
          <option value={2}>Done</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12l-6-6 1.5-1.5L10 9.5 18.5 1 20 2.5 11.5 11l1.5 1.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
