import { Suspense, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Await, json } from "react-router-dom";
import { fetchFunction, getToken } from "../../../hooks/http";

export default function RelatedUserField({
  label,
  userType,
  defaultRelatedUser,
}) {
  const searchInputRef = useRef();
  const [isRelatedUsersShown, setIsRelatedUsersShown] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchButtonClick = () => {
    setSearchInputValue(searchInputRef.current.value);
    setIsRelatedUsersShown(true);
  };

  return (
    <div className="my-4">
      <label
        htmlFor="hs-select-label"
        className="block text-sm font-medium mb-2 dark:text-black capitalize"
      >
        {label}
      </label>
      <div className="relative ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          ref={searchInputRef}
          type="search"
          id="default-search"
          className="outline-none block w-full p-4 ps-10  py-3 px-4 pe-16 border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 "
          placeholder="Search Mockups, Logos..."
        />
        <button
          onClick={handleSearchButtonClick}
          type="button"
          className="text-white absolute top-1 right-1 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
      {searchInputValue === "" && defaultRelatedUser ? (
        <UserCredentials
          isChecked
          resolvedData={defaultRelatedUser}
          setIsRelatedUsersShown={setIsRelatedUsersShown}
        />
      ) : (
        isRelatedUsersShown && (
          <FetchUser
            searchInputValue={searchInputValue}
            userType={userType}
            setIsRelatedUsersShown={setIsRelatedUsersShown}
          />
        )
      )}
    </div>
  );
}
function FetchUser({ searchInputValue, userType, setIsRelatedUsersShown }) {
  return (
    <Suspense
      fallback={
        <h3 className="text-gray-700 font-medium text-center py-2">
          Fetching Related Users...
        </h3>
      }
    >
      <Await resolve={usersLoader(searchInputValue, userType)}>
        {(resolvedData) => (
          <UserCredentials
            resolvedData={resolvedData}
            setIsRelatedUsersShown={setIsRelatedUsersShown}
          />
        )}
      </Await>
    </Suspense>
  );
}
function UserCredentials({ resolvedData, setIsRelatedUsersShown, isChecked }) {
  return (
    <>
      <div className="pl-3">
        <div className="flex flex-row justify-between items-center mt-3">
          <h4 className="text-gray-400 uppercase font-medium text-sm">Users</h4>
          <button type="button" onClick={() => setIsRelatedUsersShown(false)}>
            <XMarkIcon className="text-gray-400 w-6 h-6" />
          </button>
        </div>
        {resolvedData && resolvedData.length > 0 ? (
          <ul className="flex flex-col w-full gap-2 mt-3 px-3 max-h-[100px] overflow-y-auto shadow-sm">
            {resolvedData.map((user) => (
              <li key={user.email}>
                <div className="flex gap-2 items-center hover:bg-gray-100 cursor-pointer">
                  <input
                    defaultChecked={isChecked}
                    value={user.email}
                    type="radio"
                    name="related-user"
                    className="cursor"
                    htmlFor={user.email}
                  />
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.imageSrc}
                    alt={user.fullName}
                  />
                  <h4 className="text-gray-600 text-sm">{user.email}</h4>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="text-gray-700 font-medium text-center py-2">
            No Users found
          </h3>
        )}
      </div>
    </>
  );
}
async function usersLoader(searchInputValue, userType) {
  const token = getToken();
  if (!token) {
    return json({ status: 403 });
  }
  const response = await fetchFunction({
    url: "http://localhost:8081/user/profile/all-users",
    options: {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    },
  });
  const data = response.data;
  if (!userType) {
    return filterUsers(data, searchInputValue);
  } else {
    return filterUsers(data, searchInputValue, userType);
  }
}

function filterUsers(users, inputVal) {
  return users.filter((user) =>
    user.email.toLowerCase().includes(inputVal.trim().toLowerCase())
  );
}
