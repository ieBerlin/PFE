import { Link } from "react-router-dom";
import classes from "./EquipmentsPage.module.css";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import { useState } from "react";
import Modal from "../../components/modal/Modal.jsx";
import { setModalType } from "../../features/modal/modalSlice.js";
const selectedEquipments = {
  category: {
    yoga: true,
    kickboxing: true,
    fitness: true,
    bodybuilding: true,
  },
};
export default function EquipmentsList({ data }) {
  const isAdmin =
    useSelector((state) => state.userRole.userRole).toLowerCase() === "admin";
  const [currentSelectedEquipments, setCurrentSelectedEquipments] =
    useState(selectedEquipments);
  const filteredEquipments = filterEquipements(data, currentSelectedEquipments);
  return (
    <section className={classes.sectionContainer}>
      <h1 className="font-semibold text-2xl mb-2">All Equipments</h1>
      <div className="bg-gray-100  rounded-lg p-4">
        <div className="flex w-full items-center justify-between  mt-4 ">
          {isAdmin ? (
            <Link
              className="my-2 bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
              to="/equipments/bookings"
            >
              Equipments Booking History
            </Link>
          ) : (
            <div />
          )}
          <FilterDropdown
            currentSelectedData={currentSelectedEquipments}
            setData={setCurrentSelectedEquipments}
            filterOptionsData={[
              {
                title: "category",
                options: ["kickboxing", "fitness", "yoga", "bodybuilding"],
              },
              // {
              //   title: "equipment.Status",
              //   options: ["new", "old"],
              // },
            ]}
          />
        </div>
        <div
          className=" gap-x-3 justify-center grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {filteredEquipments && filteredEquipments.length > 0 ? (
            filteredEquipments.map((item) => (
              <EquipmentItem key={item.id} equipmentData={item} />
            ))
          ) : (
            <div className="mt-4 bg-white px-6 py-4 shadow-md">
              <p className="text-stone-500 text-center font-bold text-xl">
                No users found!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EquipmentItem({ equipmentData }) {
  const { userRole } = useSelector((state) => state.userRole);
  const dispatch = useDispatch();
  return (
    <li
      key={"coach.coachId"}
      className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        <img
          className="object-cover flex w-full h-full"
          src="https://akfit.com/cdn/shop/articles/107194-exercise-equipmentg1.png?v=1694789703"
          alt="Coach"
        />
        <span className="absolute top-0 left-0 m-2 rounded-xl  p-[4px] text-center text-sm  bg-amber-300 text-white font-semibold">
          {equipmentData.category}
        </span>
      </div>
      <div className="mt-4 px-5 pb-5">
        <div className="my-2 flex items-center justify-between">
          <div className="overflow-hidden mr-2 text-ellipsis">
            <h5 className="text-xl tracking-tight text-purple-900 text-nowrap ">
              {equipmentData.name}
            </h5>
          </div>
          <div className="flex items-center gap-1">
            <span className=" rounded bg-amber-400 text-white  px-2.5 py-0.5 text-xs font-semibold">
              {equipmentData.rating ?? 0}
            </span>
            <span className="text-gray-500 text-sm">
              ({equipmentData.rating ?? 0})
            </span>
          </div>
        </div>
        <h3 className="text-start font-semibold text-gray-500 mb-5">
          ({equipmentData.availableQuantity}) Piece Left
        </h3>
        <div className="flex items-center gap-5">
          <h2 className="text-purple-800 font-semibold text-xl">
            ${equipmentData.price}
          </h2>
          {userRole.toLowerCase() === "admin" ? (
            <button
              onClick={() => dispatch(setModalType("edit-equipment"))}
              className="w-full flex items-center justify-center rounded-md bg-purple-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Edit Equipment <ChevronRightIcon className="ml-2 h-6 w-6" />
            </button>
          ) : (
            <Link
              to={`/equipments/book/${equipmentData.id}`}
              className="w-full flex items-center justify-center rounded-md bg-purple-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              See more <ChevronRightIcon className="ml-2 h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
function filterEquipements(users, selectedUsers) {
  return users.filter((user) => {
    // Check if the user's role is selected
    const isCategorySelected = Object.entries(selectedUsers.category).every(
      ([category, isSelected]) =>
        isSelected || user.category.toLowerCase() !== category
    );

    return isCategorySelected;
  });
}
