import classes from "./CoachesPage.module.css";
import {
  DUMMY_COACHES,
  filterCoaches,
} from "../../dummy_data/dummy_coaches.js";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CoachesPage() {
  const dropDownMenuRef = useRef(null);
  const [filterDropDownMenuOpen, setFilterDropDownMenuOpen] = useState(false);
  const buttonRef = useRef();

  const [currentSelectedCoaches, setCurrentSelectedCoaches] = useState({
    coachCategory: {
      yoga: true,
      kickboxing: true,
      fitness: true,
      bodybuilding: true,
    },
    coachLevel: {
      beginner: true,
      intermediate: true,
      advanced: true,
      expert: true,
    },
  });
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
      setFilterDropDownMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropDownMenuRef, buttonRef]);

  function toggleFilteredCoachesChange(field, type) {
    setCurrentSelectedCoaches((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: !prevState[type][field],
      },
    }));
  }
  const FILTRED_DUMMY_COACHES = filterCoaches(
    DUMMY_COACHES,
    currentSelectedCoaches
  );
  return (
    <section className={classes.sectionContainer}>
      <h1>All coaches</h1>
      <div className="bg-gray-100">
        <div className="flex flex-row w-full px-4 pt-2 mt-2">
          <div className="block w-full " />
          <div className="relative" ref={dropDownMenuRef}>
            <button
              id="dropdownCheckboxButton"
              data-dropdown-toggle="dropdownDefaultCheckbox"
              className="  text-stone-900 bg-white hover:bg-gray-50 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="button"
              ref={buttonRef}
              onClick={() => {
                setFilterDropDownMenuOpen((prevState) => !prevState);
              }}
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
            {filterDropDownMenuOpen && (
              <div
                id="dropdownDefaultCheckbox"
                className="ring-1 ring-inset ring-gray-300 z-10 absolute right-0 mt-1 w-48  bg-white divide-y divide-gray-100 rounded-lg shadow"
                style={{
                  top: "calc(100% + 5px)",
                }}
              >
                <p className=" text-black font-semibold pl-3 py-2">
                  Coach Category
                </p>
                <ul
                  className="p-3 space-y-3 text-sm "
                  aria-labelledby="dropdownCheckboxButton"
                >
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange(
                            "kickboxing",
                            "coachCategory"
                          )
                        }
                        checked={
                          currentSelectedCoaches.coachCategory.kickboxing
                        }
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Kickboxing
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange(
                            "fitness",
                            "coachCategory"
                          )
                        }
                        checked={currentSelectedCoaches.coachCategory.fitness}
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Fitness
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange("yoga", "coachCategory")
                        }
                        checked={currentSelectedCoaches.coachCategory.yoga}
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Yoga
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange(
                            "bodybuilding",
                            "coachCategory"
                          )
                        }
                        checked={
                          currentSelectedCoaches.coachCategory.bodybuilding
                        }
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Bodybuilding
                      </label>
                    </div>
                  </li>
                </ul>
                <p className=" text-black font-semibold pl-3 py-2">
                  Coach Level
                </p>
                <ul
                  className="p-3 space-y-3 text-sm "
                  aria-labelledby="dropdownCheckboxButton"
                >
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange("beginner", "coachLevel")
                        }
                        checked={currentSelectedCoaches.coachLevel.beginner}
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Beginner
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange(
                            "intermediate",
                            "coachLevel"
                          )
                        }
                        checked={currentSelectedCoaches.coachLevel.intermediate}
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Intermediate
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange("advanced", "coachLevel")
                        }
                        checked={currentSelectedCoaches.coachLevel.advanced}
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Advanced
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <input
                        onChange={() =>
                          toggleFilteredCoachesChange("expert", "coachLevel")
                        }
                        checked={currentSelectedCoaches.coachLevel.expert}
                        id="checkbox-item-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="checkbox-item-1"
                        className="ms-2 text-sm font-medium text-gray-600"
                      >
                        Expert
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <ul
          className=" mt-30 grid gap-5  rounded-md shadow-lg pb-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {FILTRED_DUMMY_COACHES.length > 0 ? (
            FILTRED_DUMMY_COACHES.map((coach) => (
              <li
                key={coach.coachId}
                className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
              >
                <div className="relative mx-3 mt-3 flex h-60 overflow-hidden  rounded-xl bg-red-500">
                  <img
                    className="object-cover flex w-full h-full"
                    src="https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg"
                    alt="product image"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-xl bg-gray-700 p-[4px] text-center text-sm font-medium text-white">
                    {coach.coachCategory}
                  </span>
                </div>
                <div className="mt-4 px-5 pb-5">
                  <Link to={`${coach.coachId}`}>
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {coach.coachName}
                    </h5>
                  </Link>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      {/* <span className="text-3xl font-bold text-slate-900">
                    $449
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    $699
                  </span> */}
                    </p>
                    <div className="flex items-center">
                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        {coach.coachLevel}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`${coach.coachId}`}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    See more
                    <ChevronRightIcon className="ml-2 h-6 w-6" />
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <div className="mt-4 bg-white px-6 py-4 shadow-md mx-2">
              <p className="text-stone-500 text-center font-bold text-xl">
                No coaches found!
              </p>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
}
