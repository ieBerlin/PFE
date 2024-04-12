import { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { DUMMY_USERS, filterUsers } from "../../dummy_data/dummy_users.js";

export default function AllUserPage() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();
  const dropDownMenuRef = useRef();
  const [currentSelectedUsers, setCurrentSelectedUsers] = useState({
    userRole: {
      admin: true,
      coach: true,
      member: true,
    },
    status: {
      active: true,
      pending: true,
      blocked: true,
    },
  });
  const FILTRED_DUMMY_USERS = filterUsers(DUMMY_USERS, currentSelectedUsers);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !buttonRef.current ||
        buttonRef.current.contains(event.target) ||
        !dropDownMenuRef.current ||
        dropDownMenuRef.current.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropDownMenuRef, buttonRef]);
  const toggleFilteredUsersChange = (field, type) => {
    setCurrentSelectedUsers((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: !prevState[type][field],
      },
    }));
  };
  return (
    <main className="bg-gray-100 min-h-screen px-8 py-4 pb-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-end">
          <h1 className="text-black font-bold text-2xl">All users</h1>
          <span className="text-sm text-stone-400 font-medium mb-1">127</span>
        </div>

        <div className="flex items-center flex-row gap-3">
          <div className="relative" ref={dropDownMenuRef}>
            <button
              id="dropdownCheckboxButton"
              data-dropdown-toggle="dropdownDefaultCheckbox"
              className=" text-stone-900 bg-white hover:bg-gray-50 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="button"
              onClick={() => {
                setIsOpen(!isOpen);
                buttonRef.current.blur();
              }}
              ref={(node) => (buttonRef.current = node)}
            >
              <p> Filter</p>
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <Transition
              show={isOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {(ref) => (
                <div
                  ref={ref}
                  id="dropdownDefaultCheckbox"
                  className="ring-1 ring-inset ring-gray-300 z-10 absolute left-0 mt-1 w-48  bg-white divide-y divide-gray-100 rounded-lg shadow"
                  style={{
                    top: "calc(100% + 5px)",
                  }}
                >
                  <p className=" text-black font-semibold pl-3 py-2">
                    User Role
                  </p>
                  <ul
                    className="p-3 space-y-3 text-sm "
                    aria-labelledby="dropdownCheckboxButton"
                  >
                    <li>
                      <div className="flex items-center">
                        <input
                          onChange={() =>
                            toggleFilteredUsersChange("admin", "userRole")
                          }
                          checked={currentSelectedUsers.userRole.admin}
                          id="checkbox-item-1"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="checkbox-item-1"
                          className="ms-2 text-sm font-medium text-gray-600"
                        >
                          Admin
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          onChange={() =>
                            toggleFilteredUsersChange("coach", "userRole")
                          }
                          checked={currentSelectedUsers.userRole.coach}
                          id="checkbox-item-1"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="checkbox-item-1"
                          className="ms-2 text-sm font-medium text-gray-600"
                        >
                          Coach
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          onChange={() =>
                            toggleFilteredUsersChange("member", "userRole")
                          }
                          checked={currentSelectedUsers.userRole.member}
                          id="checkbox-item-1"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="checkbox-item-1"
                          className="ms-2 text-sm font-medium text-gray-600"
                        >
                          Member
                        </label>
                      </div>
                    </li>
                  </ul>
                  <p className=" text-black font-semibold pl-3 py-2">Status</p>
                  <ul
                    className="p-3 space-y-3 text-sm "
                    aria-labelledby="dropdownCheckboxButton"
                  >
                    <li>
                      <div className="flex items-center">
                        <input
                          onChange={() =>
                            toggleFilteredUsersChange("active", "status")
                          }
                          checked={currentSelectedUsers.status.active}
                          id="checkbox-item-1"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="checkbox-item-1"
                          className="ms-2 text-sm font-medium text-gray-600"
                        >
                          active
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          onChange={() =>
                            toggleFilteredUsersChange("pending", "status")
                          }
                          checked={currentSelectedUsers.status.pending}
                          id="checkbox-item-1"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="checkbox-item-1"
                          className="ms-2 text-sm font-medium text-gray-600"
                        >
                          Pending
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          onChange={() =>
                            toggleFilteredUsersChange("blocked", "status")
                          }
                          checked={currentSelectedUsers.status.blocked}
                          id="checkbox-item-1"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="checkbox-item-1"
                          className="ms-2 text-sm font-medium text-gray-600"
                        >
                          Blocked
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </Transition>
          </div>
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
      {FILTRED_DUMMY_USERS.length > 0 ? (
        FILTRED_DUMMY_USERS.map((user) => {
          let userRoleClasses;
          let statusClasses;
          if (user.status.toLowerCase().trim() === "active") {
            statusClasses = "text-green-500";
          } else if (user.status.toLowerCase().trim() === "pending") {
            statusClasses = "text-yellow-500";
          } else if (user.status.toLowerCase().trim() === "blocked") {
            statusClasses = "text-red-500";
          } else {
            statusClasses = "text-stone-500";
          }
          if (user.role.toLowerCase().trim() === "admin") {
            userRoleClasses = {
              roleBg: "bg-orange-200",
              roleTxt: "text-orange-900",
            };
          } else if (user.role.toLowerCase().trim() === "coach") {
            userRoleClasses = {
              roleBg: "bg-yellow-200",
              roleTxt: "text-yellow-900",
            };
          } else {
            userRoleClasses = {
              roleBg: "bg-blue-200",
              roleTxt: "text-blue-900",
            };
          }
          return (
            <div
              key={user.id}
              className="mt-4 bg-white grid grid-cols-4 items-center px-6 py-2 shadow-md"
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
                className={`mx-auto  ${userRoleClasses.roleBg} ${userRoleClasses.roleTxt} flex font-bold w-min px-4 py-1 rounded-lg`}
              >
                {user.role}
              </div>
              <h1 className={`font-bold ${statusClasses} text-center`}>
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
        })
      ) : (
        <div className="mt-4 bg-white px-6 py-4 shadow-md">
          <p className="text-stone-500 text-center font-bold text-xl">
            No users found!
          </p>
        </div>
      )}
    </main>
  );
}
