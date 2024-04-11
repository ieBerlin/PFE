import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DUMMY_USERS } from "../../dummy_data/dummy_users.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUserPage() {
  return (
    <main className="bg-gray-100 px-8 py-4 pb-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-end">
          <h1 className="text-black font-bold text-2xl">All users</h1>
          <span className="text-sm text-stone-400 font-medium mb-1">127</span>
        </div>

        <div className="flex items-center flex-row gap-3">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Filter
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <h2 className="text-sm font-medium px-4 py-2">
                    Transaction Type
                  </h2>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "px-4 py-2 text-sm flex flex-row items-center justify-between"
                        )}
                      >
                        <h3>Income</h3>
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "px-4 py-2 text-sm flex flex-row items-center justify-between"
                        )}
                      >
                        <h3>Expense</h3>
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <button className="font-semibold bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
            Add user
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center mt-4 font-semibold">
        <h1 className="text-start pl-8">NAME</h1>
        <h1 className="text-center">ROLE</h1>
        <h1 className="text-center">STATUS</h1>
        <h1 className="text-end pr-8">ACTIONS</h1>
      </div>
      {DUMMY_USERS.map((user) => {
        let userClasses;
        if (user.role.toLowerCase().trim() === "admin") {
          userClasses = {
            roleBg: "bg-orange-200",
            roleTxt: "text-orange-900",
          };
        } else if (user.role.toLowerCase().trim() === "coach") {
          userClasses = {
            roleBg: "bg-yellow-200",
            roleTxt: "text-yellow-900",
          };
        } else {
          userClasses = {
            roleBg: "bg-blue-200",
            roleTxt: "text-blue-900",
          };
        }
        return (
          <div
            key={user.id}
            className="mt-4 bg-white grid grid-cols-4 items-center px-6 py-2 shadow-md "
          >
            <div className="flex flex-row gap-4 items-center">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="https://i.pinimg.com/736x/54/97/92/549792a6dabb17e61a53be9f1ceb60a8.jpg"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="font-semibold">{user.name}</h1>
                <p className="text-stone-500 text-sm w-30 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div
              className={`mx-auto  ${userClasses.roleBg} ${userClasses.roleTxt} flex font-bold w-min px-4 py-1 rounded-lg`}
            >
              {user.role}
            </div>
            <h1
              className={`
             font-medium ${null} text-center`}
            >
              {user.status}
            </h1>
            <div className="flex flex-row gap-2 items-center justify-end">
              <button className="flex items-center flex-row gap-2 text-gray-400 hover:text-blue-600 font-bold text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                reset password
              </button>
              <button className="flex items-center flex-row gap-2 text-gray-400 hover:text-blue-600 font-bold text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </main>
  );
}
