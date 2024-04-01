import { ChangeEvent, MutableRefObject, useContext, useRef } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

import { ListItemContext } from "@/components/lib/ListItem/context";

export default function Filter(): JSX.Element {
  const statusRef: MutableRefObject<HTMLSelectElement> = useRef(null!);
  const { filters, setFilters } = useContext(ListItemContext);

  const options: Array<Record<string, number | string>> = [
    { value: -1, label: "All" },
    { value: 0, label: "Pending" },
    { value: 1, label: "Work in Progress" },
    { value: 2, label: "Done" },
  ];

  const updateFilters = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    if (statusRef.current.value === "-1" && "status" in filters) {
      delete filters.status;
      setFilters({ ...filters });
    } else {
      setFilters({ ...filters, status: Number(statusRef.current.value) });
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
          {options.map(
            (option: Record<string, number | string>): JSX.Element => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ArrowDownIcon height={8} />
        </div>
      </div>
    </div>
  );
}
