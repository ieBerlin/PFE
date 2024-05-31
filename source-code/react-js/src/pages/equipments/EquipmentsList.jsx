import { Link } from "react-router-dom";
import classes from "./EquipmentsPage.module.css";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import { useState } from "react";
import { setModalType } from "../../features/modal/modalSlice.js";
import Modal from "../../components/modal/Modal.jsx";
import SearchInput from "../../components/SearchInput.jsx";
const selectedEquipments = {
  category: {
    yoga: true,
    kickboxing: true,
    fitness: true,
    bodybuilding: true,
  },
};
export default function EquipmentsList({ data }) {
  const [inputValue, setInputValue] = useState("");
  const isAdmin =
    useSelector((state) => state.userRole.userRole?.toLowerCase()) === "admin";
  const dispatch = useDispatch();
  const [currentSelectedEquipments, setCurrentSelectedEquipments] =
    useState(selectedEquipments);
  const [currentSelectedEquipmentData, setCurrentSelectedEquipmentData] =
    useState(null);
  const filteredEquipments = filterEquipements(
    data,
    currentSelectedEquipments,
    inputValue
  );
  const modal = isAdmin ? (
    <Modal equipmentData={currentSelectedEquipmentData} />
  ) : (
    <Modal />
  );

  return (
    <>
      {modal}

      <div className="bg-white rounded-md  pt-3 mt-5">
        <div className="flex w-full items-center justify-between px-3">
          {isAdmin ? (
            <div className="items-center gap-2 flex w-min whitespace-nowrap">
              <Link
                className="my-2 bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
                to="/equipments/bookings"
              >
                Equipments Booking History
              </Link>

              <button
                onClick={() => dispatch(setModalType("add-equipment"))}
                className="my-2 bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
              >
                Add Equipment
              </button>
            </div>
          ) : (
            <div />
          )}
          <div className="flex flex-row items-center gap-2">
            <SearchInput
              onSearch={(value) => setInputValue(value)}
              placeholder="Type the Equipment's name"
            />
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
        </div>
        <div
          className=" gap-x-3 justify-center grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {filteredEquipments && filteredEquipments.length > 0 ? (
            filteredEquipments.map((item) => (
              <EquipmentItem
                key={item.id}
                equipmentData={item}
                onEditEquipment={setCurrentSelectedEquipmentData}
              />
            ))
          ) : (
            <div className="mt-4 bg-white px-6 py-4 shadow-md">
              <p className="text-stone-500 text-center font-bold text-xl">
                No equipments found!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function EquipmentItem({ equipmentData, onEditEquipment }) {
  const { userRole } = useSelector((state) => state.userRole);
  const dispatch = useDispatch();
  const image = equipmentData.image
    ? equipmentData.image.startsWith("http://")
      ? equipmentData.image
      : "http://localhost:8081/uploads/images/equipment/" + equipmentData.image
    : "http://localhost:8081/uploads/images/equipment/default-equipment-image.jpg";

  return (
    <li
      key={"coach.coachId"}
      className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        <img
          className="object-cover flex w-full h-full"
          src={image}
          alt="Coach"
        />
        <span className="absolute top-0 left-0 m-2 rounded-xl text-center text-sm bg-blue-400   p-[4px]   text-white font-semibold">
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
          {/* <div className="flex items-center gap-1">
            <span className=" rounded bg-amber-400 text-white  px-2.5 py-0.5 text-xs font-semibold">
              {equipmentData.rating ?? 0}
            </span>
            <span className="text-gray-500 text-sm">
              ({equipmentData.rating ?? 0})
            </span>
          </div> */}
        </div>
        <h3 className="text-start font-semibold text-gray-500 mb-5">
          ({equipmentData.availableQuantity}) Piece Left
        </h3>
        <div className="flex items-center gap-5">
          <h2 className="text-purple-800 font-semibold text-xl text-center">
            {equipmentData.price} {" "}DZD
          </h2>
          {userRole?.toLowerCase() === "admin" ? (
            <button
              onClick={() => {
                onEditEquipment(equipmentData);
                dispatch(setModalType("edit-equipment"));
              }}
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
function filterEquipements(equipments, selectedEquipments, inputValue) {
  const filterEquipmentsDependOnInputValue = equipments.filter((equipment) => {
    return Object.entries(equipment).some(
      ([key, value]) =>
        (key === "name" || key === "category") &&
        typeof value === "string" &&
        value.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return filterEquipmentsDependOnInputValue.filter((equipment) => {
    return Object.entries(selectedEquipments.category).some(
      ([category, isSelected]) => {
        return (
          isSelected &&
          equipment.category.toLowerCase() === category.toLowerCase()
        );
      }
    );
  });
}
