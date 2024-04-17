import { Suspense, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";

import {
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
export async function loader({ params }) {
  const { coachId } = params;
  return defer({
    timeOut: timeOut({ coachId }),
  });
}
const timeOut = ({ coachId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const coachData = DUMMY_COACHES.find(
        (coach) => coach.coachId === +coachId
      );
      if (coachData) {
        resolve(coachData);
      } else {
        reject(new Error("Coach not found"));
      }
    }, 0);
  });
};
export default function App() {
  const { timeOut } = useLoaderData();
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <div className="bg-white-100">
      <Suspense fallback={<FallbackText />}>
        <Await resolve={timeOut} errorElement={<p>Error occurred</p>}>
          {(loadedEvents) => {
            const {
              coachName,
              coachEmail,
              coachExperience,
              coachLevel,
              coachCategory,
              totalTrainedMembers,
              coachContact,
            } = loadedEvents;
            return (
              <div className="bg-gray-100 py-4 px-10">
                <div className="py-2 pl-5">
                  <img
                    className="rounded-full w-32 h-32 object-cover"
                    src="https://evilreporterchick.files.wordpress.com/2010/03/jeremy_renner.jpg"
                    alt=""
                  />
                </div>
                <div
                  className="grid mt-4"
                  style={{
                    gridTemplateColumns: "auto 1fr",
                  }}
                >
                  <div className="bg-white shadow-md pl-8 pr-16 py-6">
                    <h1 className="font-bold text-2xl">{coachName}</h1>
                    <p className="text-sm text-gray-600">{coachCategory}</p>
                    <div className="flex flex-row items-center justify-start gap-3 my-3">
                      <div className="bg-yellow-400 px-4 py-1 w-min rounded-md flex flex-row items-center gap-1">
                        <StarIcon className="h-4 w-4 text-white " />
                        <h3 className="text-white">4.5</h3>
                      </div>
                      <h4 className="text-gray-600"> (12)</h4>
                    </div>
                    <h1 className="flex items-center gap-2">
                      <UserGroupIcon className="w-6 h-6 text-gray-500" />
                      <p className=" text-gray-500 font-medium text-sm">
                        {totalTrainedMembers} Total Trained Members
                      </p>
                    </h1>
                    <h1 className="flex items-center gap-2 mt-2">
                      <AcademicCapIcon className="w-6 h-6 text-gray-500" />
                      <p className=" text-gray-500 font-medium text-sm">
                        {coachLevel}
                      </p>
                    </h1>
                    <div className="mt-4">
                      <h1 className="font-semibold my-2">Connect With Me</h1>

                      <a
                        href={`mailto:${coachEmail}`}
                        className="text-gray-600 font-medium inline"
                      >
                        {coachEmail}
                      </a>

                      {Object.entries(coachContact).map(([key, value]) => (
                        <a
                          href={value}
                          className="block cursor-pointer text-gray-600 font-medium my-1"
                          target="_blank"
                          key={key}
                        >
                          {value}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="  bg-white ml-2 rounded-lg shadow-md">
                    <ul className="flex justify-center py-1 text-sm font-medium text-center text-gray-500 ">
                      <li className="me-2">
                        <button
                          onClick={() => setCurrentTab(1)}
                          className={`${
                            currentTab === 1 ? "bg-gray-700 " : "bg-gray-400"
                          } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
                        >
                          Introduction
                        </button>
                      </li>
                      <li className="me-2">
                        <button
                          onClick={() => setCurrentTab(2)}
                          className={`${
                            currentTab === 2 ? "bg-gray-700 " : "bg-gray-400"
                          } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
                        >
                          Classes
                        </button>
                      </li>
                      <li className="me-2">
                        <button
                          onClick={() => setCurrentTab(3)}
                          className={`${
                            currentTab === 3 ? "bg-gray-700 " : "bg-gray-400"
                          } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
                        >
                          Rating & Reviews
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

function FallbackText() {
  return (
    <section className="py-4 px-6 bg-gray-100 flex h-full w-full flex-col">
      <h1 className="font-bold text-2xl mb-3 text-black">Coach Detail Page</h1>
      <p className="text-gray-700 text-xl font-semibold text-center mt-7">
        Fetching Coach Details...
      </p>
    </section>
  );
}
