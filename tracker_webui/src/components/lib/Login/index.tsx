import { AxiosResponse } from "axios";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { FormEvent, MutableRefObject, useRef } from "react";

import { Payload } from "./types";
import { API, Page, Public, LOCAL_STORAGE_KEY } from "@/config";
import { Token } from "@/interfaces/entities";
import { api } from "@/services/axios";

export default function Login(): JSX.Element {
  /**
   * Login Component
   */
  const router: NextRouter = useRouter();

  const usernameRef: MutableRefObject<HTMLInputElement> = useRef(null!);
  const passwordRef: MutableRefObject<HTMLInputElement> = useRef(null!);

  const performLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const payload: Payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    const response: AxiosResponse = await api.post(API.ACCOUNT_LOGIN, payload);
    if (response.status !== 201) {
      alert(JSON.stringify(await response.data));
      return;
    }
    const data: Token = response.data;
    localStorage.setItem(LOCAL_STORAGE_KEY, data.token);
    router.push(Page.DASHBOARD);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            src={Public.ANDROID_CHROME_512}
            alt="logo"
            width={100}
            height={100}
          />
          Tracker
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={performLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="someone"
                  required={true}
                  ref={usernameRef}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  autoComplete="off"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  ref={passwordRef}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
