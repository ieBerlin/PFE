import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { filterCoaches } from "../../dummy_data/dummy_coaches";
import FilterDropdown from "../../components/FilterDropdown.jsx";
const selectedCoaches = {
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
};
export default function AvailableCoaches({ coaches }) {
  console.log(coaches)
  const [currentSelectedCoaches, setCurrentSelectedCoaches] =
    useState(selectedCoaches);

  const filteredCoaches = filterCoaches(coaches, currentSelectedCoaches);
  return (
    <div className="bg-white rounded-md mt-5">
      <div className="flex flex-row w-full px-4 pt-3 justify-between items-center ">
        <div />
        <FilterDropdown
          currentSelectedData={currentSelectedCoaches}
          setData={setCurrentSelectedCoaches}
          filterOptionsData={[
            {
              title: "coach.Category",
              options: ["kickboxing", "fitness", "yoga", "bodybuilding"],
            },
            {
              title: "coach.Level",
              options: ["beginner", "intermediate", "advanced", "expert"],
            },
          ]}
        />
      </div>
      <CoachList coaches={filteredCoaches} />
    </div>
  );
}

function CoachList({ coaches }) {
  if (!coaches || coaches.length === 0) {
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
      className="mt-30 grid gap-5 rounded-md pb-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      {coaches.map((coach) => (
        <CoachCard key={coach.userId} coach={coach} />
      ))}
    </ul>
  );
}
export function CoachCard({ coach }) {
  return (
    <li className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        <img
          className="object-cover flex w-full h-full"
          src="https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg"
          alt="Coach"
        />
        <span className="absolute top-0 left-0 m-2 rounded-xl bg-gray-700 p-[4px] text-center text-sm font-medium text-white">
          {coach.specialization ?? "specialization"}
        </span>
      </div>
      <div className="mt-4 px-5 pb-5">
        <Link to={`${coach.userId}`}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {coach?.first_name + " " + coach?.last_name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {coach.experienceLevel ?? "experience level"}
            </span>
          </div>
        </div>
        <Link
          to={`${coach.userId ?? ""}`}
          className="flex items-center justify-center rounded-md bg-blue-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          See more <ChevronRightIcon className="ml-2 h-6 w-6" />
        </Link>
      </div>
    </li>
  );
}
