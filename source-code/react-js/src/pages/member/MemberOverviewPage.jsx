import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ClassItem from "../sports/ClassItem";
import BillingHistory from "../../components/BillingHistory.jsx";
import { billingItems } from "../../dummy_data/dummy_users.js";
import { Link } from "react-router-dom";

export default function MemberOverviewPage() {
  const membershipStatus = "active"; // Declare membership status directly
  const upcomingClasses = [
    // {
    //   id: 1,
    //   name: "Class 1",
    // },
  ];

  const coaches = [
    // {
    //   id: 1,
    //   name: "John Doe",
    //   category: "Fitness Trainer",
    //   level: "Advanced",
    // },
  ];
  const equipments = [
    // {
    //   id: 1,
    //   name: "John Doe",
    //   category: "Fitness Trainer",
    //   level: "Advanced",
    // },
  ];

  const membershipStatusStyle =
    membershipStatus === "active"
      ? "emerald"
      : membershipStatus === "end"
      ? "red"
      : "blue";

  return (
    <div className="bg-gray-100 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-5">Overview</h1>
      <div className="px-5">
        <h3 className="text-gray-700 font-semibold text-xl">
          Membership Status
        </h3>
        <div className="flex flex-row gap-3 w-min whitespace-nowrap bg-blue-100 my-3 px-3 py-2 rounded-md items-center">
          <h3 className="text-gray-900 font-medium">Membership status :</h3>
          <p
            className={`text-${membershipStatusStyle}-500 capitalize font-semibold`}
          >
            {membershipStatus}
          </p>

          {membershipStatus === "active" && (
            <div className=" flex flex-row gap-2 items-center px-3 py-1">
              <h4 className="font-medium">From</h4>
              <DateComponent />
              <h4 className="font-medium">To</h4>
              <DateComponent />
            </div>
          )}
        </div>
        <h3 className="text-gray-700 font-semibold text-xl mb-3">
          Upcoming Classes You've Signed Up For
        </h3>

        {upcomingClasses && upcomingClasses.length > 0 ? (
          <div
            className="grid gap-3 bg-white py-2 rounded-md mb-3"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(auto,250px))",
            }}
          >
            {upcomingClasses.map((classItem) => (
              <ClassItem key={classItem.id} data={classItem} />
            ))}
          </div>
        ) : (
          <EmptyComponent title="There's no classes!" />
        )}
        <h3 className="text-gray-700 font-semibold text-xl">
          Coaches You're Training With
        </h3>
        {coaches && coaches.length > 0 ? (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(auto,250px))",
            }}
          >
            {coaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        ) : (
          <EmptyComponent title="There's no coaches to show !" />
        )}
        <h3 className="text-gray-700 font-semibold text-xl">
          Equipment Already Booked
        </h3>
        {equipments && equipments.length > 0 ? (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(auto,250px))",
            }}
          >
            {equipments.map((equipment) => (
              <CoachCard key={equipment.id} coach={equipment} />
            ))}
          </div>
        ) : (
          <EmptyComponent title="There's no equipments to show !" />
        )}
        <h3 className="text-gray-700 font-semibold text-xl">Billing History</h3>
        <BillingHistory data={billingItems} />
      </div>
    </div>
  );
}

function DateComponent() {
  return (
    <div className="rounded-lg flex flex-row items-center gap-2 justify-center p-2  whitespace-nowrap">
      <CalendarIcon className="w-5 h-5 text-blue-600" />
      <p className="text-blue-800 font-medium text-sm">2024-10-02</p>
    </div>
  );
}

function CoachCard({ coach }) {
  return (
    <li className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        <img
          className="object-cover flex w-full h-full"
          src="https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg"
          alt="Coach"
        />
        <span className="absolute top-0 left-0 m-2 rounded-xl bg-amber-400 p-[4px] text-center text-sm font-medium text-white">
          {coach.category}
        </span>
      </div>
      <div className="mt-2 px-5 pb-5">
        <Link to={`${coach.id}`}>
          <h5 className="text-xl tracking-tight text-center text-slate-900">
            {coach.name}
          </h5>
        </Link>

        <Link
          to={`${coach.id}`}
          className="mt-2 flex items-center justify-center rounded-md bg-amber-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          See Progress <ChevronRightIcon className="ml-2 h-6 w-6" />
        </Link>
      </div>
    </li>
  );
}
function EmptyComponent({ title }) {
  return (
    <h3 className="text-black text-xl my-3 bg-white py-3 rounded-md text-center font-semibold">
      {title}
    </h3>
  );
}
