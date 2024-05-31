import { useDispatch } from "react-redux";
import { useState } from "react";
import { setModalType } from "../../features/modal/modalSlice.js";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import SearchInput from "../../components/SearchInput.jsx";

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
  const [inputValue, setInputValue] = useState("");
  const [currentSelectedUsers, setCurrentSelectedUsers] =
    useState(selectedUsers);

  const filteredUsers = filterUsers(users, currentSelectedUsers, inputValue);

  const dispatch = useDispatch();

  return (
    <main className="bg-white min-h-screen px-8 py-4 pb-8 shadow-md rounded-md">
      <div className="flex flex-row justify-between">
      <button
            onClick={() => dispatch(setModalType("send-message-to-users"))}
            className="font-semibold whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300"
          >
            Send Notifications To All Users
          </button>

        <div className="flex items-center flex-row gap-3">
          <SearchInput
            placeholder="Type the User's name"
            onSearch={(value) => setInputValue(value)}
          />
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
            className="font-semibold whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center mt-4 font-semibold">
        <h1 className="text-start pl-8">NAME</h1>
        <h1 className="text-center">ROLE</h1>
        <h1 className="text-center">STATUS</h1>
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
              key={user.username}
              className="mt-4 bg-gray-100 grid grid-cols-4 items-center px-6 py-2 rounded-md"
            >
              {user.role.toLowerCase() === "coach" ||
              user.role.toLowerCase() === "member" ? (
                <a
                  href={`/user/${user.userId}`}
                  className="flex flex-row gap-4 items-center"
                >
                  <img
                    className="rounded-full h-12 w-12 object-cover"
                    src={
                      user.image ??
                      "http://localhost:8081/uploads/images/profile/default-user-image.webp"
                    }
                    alt=""
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold">{`${user.first_name} ${user.last_name}`}</h1>
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

const filterUsers = (users, selectedUsers, inputValue) => {
  const filteredUsers = users.filter((user) => {
    const isNameMatch =
      user.first_name.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.last_name.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.email.toLowerCase().includes(inputValue.toLowerCase());

    const isRoleSelected = Object.keys(selectedUsers.userRole).some(
      (role) =>
        selectedUsers.userRole[role] &&
        user.role.toLowerCase() === role.toLowerCase()
    );

    const isStatusSelected = Object.keys(selectedUsers.status).some(
      (status) =>
        selectedUsers.status[status] &&
        user.status.toLowerCase() === status.toLowerCase()
    );

    return isNameMatch && isRoleSelected && isStatusSelected;
  });

  return filteredUsers;
};
