import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { MouseEvent, useState } from "react";

import { API, Browser, LOCAL_STORAGE_KEY } from "@/constants";
import { useUser } from "@/hooks";
import { api } from "@/services/axios";

export default function Navbar(): JSX.Element {
  const router: NextRouter = useRouter();
  const [user, loading] = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const perfromLogout = async (
    e: MouseEvent<HTMLParagraphElement>
  ): Promise<void> => {
    e.preventDefault();
    await api.delete(API.ACCOUNT_LOGOUT);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    router.push(Browser.ROOT);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image
              className="h-8 w-8"
              src={Browser.ANDROID_CHROME_512}
              alt="Logo"
              width={100}
              height={100}
            />
            <span className="text-white text-lg font-semibold ml-2">
              Tracker
            </span>
          </div>

          <div className="ml-4 relative">
            <div>
              <button
                type="button"
                className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open dropdown menu</span>
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <p
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    <strong>
                      {loading ? (
                        <>Stranger</>
                      ) : (
                        <>
                          {user.first_name} {user.last_name}
                        </>
                      )}
                    </strong>
                  </p>
                  <p
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={perfromLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
