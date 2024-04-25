import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setModalType } from "../../../features/modal/modalSlice.js";
import Modal from "../../../components/modal/Modal.jsx";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronLeftIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { defineUserNavs } from "../../../features/userRole/user-navs.jsx";

function ProfileDropDownMenu() {
  const dispatch = useDispatch();
  const { userRole } = useSelector((state) => state.userRole);
  const profileDropDownMenuItems = defineUserNavs(userRole)?.dropDownMenu;
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const signOutHandler = () => {
    dispatch(setModalType("confirm-sign-out"));
  };

  return (
    <>
      <Modal />
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div className="h-5">
              <Menu.Button className="text-sm font-semibold text-gray-900">
                <ChevronLeftIcon
                  className={`text-white w-5 h-5 transition-transform ${
                    open ? "-rotate-90" : "rotate-0"
                  }`}
                />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={classNames(
                          active
                            ? "bg-red-50 text-red-600"
                            : "text-gray-700",
                          "px-4 py-2 text-sm flex flex-row items-center gap-3 font-medium"
                        )}
                      >
                        <UserIcon
                          className={`w-5 h-5 ${
                            active ? "text-red-600" : "text-gray-700"
                          } `}
                        />
                        <span
                          className={`${
                            active ? "text-red-600" : "text-gray-700"
                          }`}
                        >
                          Profile
                        </span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  {profileDropDownMenuItems &&
                    profileDropDownMenuItems.map((item) => (
                      <Menu.Item key={item.id}>
                        {({ active }) => (
                          <a
                            href={`${item.href}`}
                            className={classNames(
                              active
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700",
                              "px-4 py-2 text-sm flex flex-row items-center gap-3 font-medium"
                            )}
                          >
                            {item.labelSvg}
                            <span
                              className={
                                active ? "text-blue-700" : "text-gray-700"
                              }
                            >
                              {item.label}
                            </span>
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={signOutHandler}
                        className={classNames(
                          active
                            ? "bg-emerald-50 text-gray-900"
                            : "text-gray-700",
                          "px-4 py-2 text-sm flex flex-row items-center gap-3 font-medium w-full"
                        )}
                      >
                        <ArrowRightStartOnRectangleIcon
                          className={`w-5 h-5 ${
                            active ? "text-emerald-700" : "text-gray-700"
                          } `}
                        />
                        <span
                          className={`${
                            active ? "text-emerald-700" : "text-gray-700"
                          }`}
                        >
                          Sign out
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

export default ProfileDropDownMenu;
