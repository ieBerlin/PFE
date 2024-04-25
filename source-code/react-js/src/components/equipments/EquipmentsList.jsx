import { Link } from "react-router-dom";
import classes from "./EquipmentsPage.module.css";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import FilterDropdown from "../FilterDropdown";
import { useState } from "react";
const selectedEquipments = {
  category: {
    yoga: true,
    kickboxing: true,
    fitness: true,
    bodybuilding: true,
  },
};
export default function EquipmentsList({ data }) {
  const [currentSelectedEquipments, setCurrentSelectedEquipments] =
    useState(selectedEquipments);
  return (
    <section className={classes.sectionContainer}>
      <h1 className="font-semibold text-2xl mb-2">All Equipments</h1>
      <div className="bg-gray-100  rounded-lg p-4">
        <div className="flex w-full items-center justify-end  mt-4 ">
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
          {data.map((item) => (
            <EquipmentItem key={item.id} equipmentData={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EquipmentItem({ equipmentData }) {
  const { userRole } = useSelector((state) => state.userRole);
  return (
    <li
      key={"coach.coachId"}
      className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        <img
          className="object-cover flex w-full h-full"
          src="https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg"
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
            <button className="w-full flex items-center justify-center rounded-md bg-purple-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
              Edit Equipment <ChevronRightIcon className="ml-2 h-6 w-6" />
            </button>
          ) : (
            <Link
              to={`${"coach.coachId"}`}
              className="w-full flex items-center justify-center rounded-md bg-purple-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              See more <ChevronRightIcon className="ml-2 h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
