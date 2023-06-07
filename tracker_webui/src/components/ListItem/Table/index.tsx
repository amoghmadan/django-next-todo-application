import { AxiosResponse } from "axios";
import { ChangeEvent, MouseEvent, useContext } from "react";

import { API } from "@/constants";
import { ListItemContext } from "@/contexts";
import { IContext } from "@/contexts/ListItemContext/types";
import { Item } from "@/interfaces";
import { api } from "@/services/axios";

export default function Table(): JSX.Element {
  const statusMapping: Record<number, string> = {
    0: "Pending",
    1: "Work in Progress",
    2: "Done",
  };
  const columns: string[] = ["ID", "Text", "Status", "Remove"];
  const { itemList, loading } = useContext(ListItemContext) as IContext;

  const updateStatus =
    (id: number) =>
    async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
      const response: AxiosResponse = await api.patch(
        `${API.TASK_ITEM}${id}/`,
        { status: e.target.value }
      );
      if (response.status !== 200) {
        alert("Oops, something went wrong!");
        return;
      }
      window.location.reload();
    };

  const destroyTaskItem =
    (id: Number) =>
    async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
      e.preventDefault();
      await api.delete(`${API.TASK_ITEM}${id}/`);
      window.location.reload();
    };

  if (loading) return <></>;

  return (
    <div className="max-w-3xl mx-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column: string): JSX.Element => {
              return (
                <th
                  key={column}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700"
                >
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {itemList.results.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700 text-center"
              >
                No Content
              </td>
            </tr>
          ) : (
            itemList.results.map((item: Item): JSX.Element => {
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    {item.text}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    <select
                      name="status"
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      defaultValue={item.status}
                      onChange={updateStatus(Number(item.id))}
                    >
                      {Object.entries(statusMapping).map(
                        (element: string[]): JSX.Element => {
                          return (
                            <option key={element[0]} value={element[0]}>
                              {element[1]}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
                      onClick={destroyTaskItem(Number(item.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
