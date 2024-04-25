import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterUsers } from "../../dummy_data/dummy_users.js";
import { setModalType } from "../../features/modal/modalSlice.js";
import FilterDropdown from "../../components/FilterDropdown.jsx";

const selectedUsers = {
  userRole: {
    admin: true,
    coach: true,
    member: true,
  },
  status: {
    active: true,
    blocked: true,
  },
};
export default function AllUsersList({ users }) {
  const [currentSelectedUsers, setCurrentSelectedUsers] =
    useState(selectedUsers);

  const filteredUsers = filterUsers(users, currentSelectedUsers);

  const dispatch = useDispatch();

  return (
    <main className="bg-gray-50 min-h-screen px-8 py-4 pb-8">
      <div className="flex flex-row justify-between">
        <div className="font-semibold text-2xl">
          All Users{" "}
          <span className="text-gray-600 text-lg">
            ({filteredUsers.length})
          </span>
        </div>

        <div className="flex items-center flex-row gap-3">
          <FilterDropdown
            currentSelectedData={currentSelectedUsers}
            filterOptionsData={[
              {
                title: "user.Role",
                options: ["member", "coach", "admin"],
              },
              {
                title: "status",
                options: ["active", "blocked"],
              },
            ]}
            setData={setCurrentSelectedUsers}
          />

          <button
            onClick={() => dispatch(setModalType("create-user"))}
            className="font-semibold bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300"
          >
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
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          let userRoleClasses;
          let statusClasses;
          if (user.status.toLowerCase().trim() === "active") {
            statusClasses = "text-green-500";
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
              {user.role.toLowerCase() === "coach" ||
              user.role.toLowerCase() === "member" ? (
                <a
                  href={`/user/${user.id}`}
                  className="flex flex-row gap-4 items-center"
                >
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
                </a>
              ) : (
                <div
                  href={`/user/${user.id}`}
                  className="flex flex-row gap-4 items-center"
                >
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
              )}
              <div
                className={`mx-auto  ${userRoleClasses.roleBg} ${userRoleClasses.roleTxt} flex font-bold w-min px-4 py-1 rounded-lg`}
              >
                {user.role}
              </div>
              <h1 className={`font-bold ${statusClasses} text-center`}>
                {user.status}
              </h1>
              <div className="flex flex-row gap-2 items-center justify-end">
                {(user.role.toLowerCase() === "coach" ||
                  user.role.toLowerCase() === "member") &&
                  user.status.toLowerCase() === "active" && (
                    <button
                      onClick={() =>
                        dispatch(setModalType("recharge-user-membership"))
                      }
                      className="outline-none flex items-center gap-2 flex-row w-min text-gray-400 hover:text-blue-600 font-bold text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      Recharge User Membership
                    </button>
                  )}

                <button
                  onClick={() => {
                    dispatch(setModalType("delete-user"));
                  }}
                  className=" outline-none flex items-center flex-row gap-2 text-gray-400 hover:text-blue-600 font-bold text-sm"
                >
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
