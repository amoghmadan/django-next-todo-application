import { AxiosResponse } from "axios";
import { FormEvent, MutableRefObject, useRef } from "react";

import { API } from "@/config";
import { CreateItem } from "@/interfaces/entities";
import { api } from "@/services/axios";

export default function CreateItem(): JSX.Element {
  const textRef: MutableRefObject<HTMLInputElement> = useRef(null!);
  const createTaskItem = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const payload: CreateItem = { text: textRef.current.value };
    const response: AxiosResponse = await api.post(API.TASK_ITEM, payload);
    if (response.status !== 201) {
      alert(JSON.stringify(await response.data));
      return;
    }
    window.location.reload();
  };

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={createTaskItem}>
        <div className="flex items-center border-b border-b-2 border- -500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Task description"
            ref={textRef}
            required={true}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
