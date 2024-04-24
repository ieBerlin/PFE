/* eslint-disable react/prop-types */
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { DUMMY_BOOKINGS } from "../../dummy_data/dummy_bookings.js";
import FallbackText from "../FallbackText.jsx";

import EquipmentsTable from "./EquipmentsTable.jsx";
import { Suspense } from "react";
export default function EquipmentsBookings() {
  const { timeOut } = useRouteLoaderData("equipments-bookings-id");
  return (
    <div>
      <main className="bg-gray-50 w-full px-5 pt-4 pb-10">
        <Suspense
          fallback={
            <FallbackText title="Fetching Available equipments bookings" />
          }
        >
          <Await resolve={timeOut}>
            {(resolvedData) => <EquipmentsTable data={resolvedData} />}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}

export function loader() {
  return defer({
    timeOut: timeOut(),
  });
}
function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_BOOKINGS);
    }, 5000);
  });
}
