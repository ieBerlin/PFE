import classes from "./CoachesPage.module.css";
import {
  DUMMY_COACHES,
  filterCoaches,
} from "../../dummy_data/dummy_coaches.js";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect, Suspense } from "react";
import { Await, Link, defer, useRouteLoaderData } from "react-router-dom";

export default function CoachesPage() {
  const dropDownMenuRef = useRef(null);
  const buttonRef = useRef();
  const { timeOut } = useRouteLoaderData("coaches-page");

  const [filterDropDownMenuOpen, setFilterDropDownMenuOpen] = useState(false);
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
  }, []);

  const toggleFilteredCoachesChange = (field, type) => {
    setCurrentSelectedCoaches((prevState) => ({
      ...prevState,
      [type]: { ...prevState[type], [field]: !prevState[type][field] },
    }));
  };

  return (
    <section className={classes.sectionContainer}>
      <h1>All coaches</h1>
      <div className="bg-gray-100 rounded-md">
        <div className="flex flex-row w-full px-4 pt-2 mt-2">
          <div className="block w-full" />
          <div className="relative" ref={dropDownMenuRef}>
            <button
              id="dropdownCheckboxButton"
              className="text-stone-900 bg-white hover:bg-gray-50 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="button"
              ref={buttonRef}
              onClick={() =>
                setFilterDropDownMenuOpen((prevState) => !prevState)
              }
            >
              <p>Filter</p>
              <svg
                className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
                  filterDropDownMenuOpen ? "rotate-180" : ""
                }`}
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
                className="ring-1 ring-inset ring-gray-300 z-10 absolute right-0 mt-1 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
                style={{ top: "calc(100% + 5px)" }}
              >
                {/* Coach Category */}
                <FilterOptions
                  title="Coach Category"
                  options={["kickboxing", "fitness", "yoga", "bodybuilding"]}
                  selectedOptions={currentSelectedCoaches.coachCategory}
                  onChange={(field) =>
                    toggleFilteredCoachesChange(field, "coachCategory")
                  }
                />
                {/* Coach Level */}
                <FilterOptions
                  title="Coach Level"
                  options={["beginner", "intermediate", "advanced", "expert"]}
                  selectedOptions={currentSelectedCoaches.coachLevel}
                  onChange={(field) =>
                    toggleFilteredCoachesChange(field, "coachLevel")
                  }
                />
              </div>
            )}
          </div>
        </div>
        <Suspense fallback={<FallbackText />}>
          <Await resolve={timeOut}>
            {(resolvedCoachesData) => {
              const filteredCoaches = filterCoaches(
                resolvedCoachesData,
                currentSelectedCoaches
              );
              return <CoachList coaches={filteredCoaches} />;
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

// Reusable component for filter options
function FilterOptions({ title, options, selectedOptions, onChange }) {
  return (
    <>
      <p className="text-black font-semibold pl-3 py-2">{title}</p>
      <ul className="p-3 space-y-3 text-sm">
        {options.map((option) => (
          <li key={option}>
            <div className="flex items-center">
              <input
                onChange={() => onChange(option)}
                checked={selectedOptions[option]}
                id={`checkbox-${title}-${option}`}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label
                htmlFor={`checkbox-${title}-${option}`}
                className="ms-2 text-sm font-medium text-gray-600"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

// Coach list component
function CoachList({ coaches }) {
  if (coaches.length === 0) {
    return (
      <div className="mt-4 bg-white px-6 py-4 shadow-md mx-2">
        <p className="text-stone-500 text-center font-bold text-xl">
          No coaches found!
        </p>
      </div>
    );
  }

  return (
    <ul
      className="mt-30 grid gap-5 rounded-md shadow-lg pb-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      {coaches.map((coach) => (
        <li
          key={coach.coachId}
          className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          {/* Coach Image */}
          <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
            <img
              className="object-cover flex w-full h-full"
              src="https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg"
              alt="Coach"
            />
            <span className="absolute top-0 left-0 m-2 rounded-xl bg-gray-700 p-[4px] text-center text-sm font-medium text-white">
              {coach.coachCategory}
            </span>
          </div>
          {/* Coach Details */}
          <div className="mt-4 px-5 pb-5">
            <Link to={`${coach.coachId}`}>
              <h5 className="text-xl tracking-tight text-slate-900">
                {coach.coachName}
              </h5>
            </Link>
            <div className="mt-2 mb-5 flex items-center justify-between">
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
              See more <ChevronRightIcon className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Fallback component
function FallbackText() {
  return (
    <section className="py-4 px-6 bg-gray-100 flex h-full w-full flex-col">
      <p className="text-gray-700 text-xl font-semibold text-center mt-7">
        Fetching Coaches data...
      </p>
    </section>
  );
}

// Loader function
export async function loader() {
  return defer({
    timeOut: timeOut(),
  });
}

// Timeout function
const timeOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_COACHES);
    }, 5000);
  });
};
