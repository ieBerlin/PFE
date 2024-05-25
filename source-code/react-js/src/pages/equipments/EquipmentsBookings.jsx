/* eslint-disable react/prop-types */
import { Await } from "react-router-dom";
import FallbackText from "../../components/FallbackText.jsx";
import EquipmentsTable from "./EquipmentsTable.jsx";
import { Suspense } from "react";
import { fetchFun, getToken } from "../../hooks/http.js";
export default function EquipmentsBookings() {
  return (
    <div>
      <main className="bg-gray-50 w-full px-5 pt-4 pb-10">
        <Suspense
          fallback={
            <FallbackText title="Fetching Available equipments bookings" />
          }
        >
          <Await resolve={loader()}>
            {(resolvedData) => <EquipmentsTable data={resolvedData} />}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}

async function loader() {
  try {
    return await fetchFun({
      url: "http://localhost:8081/booking",
      options: {
        method: "GET",
        headers: {
          "x-access-token": getToken(),
        },
      },
    });
  } catch (error) {
    return [];
  }
}
