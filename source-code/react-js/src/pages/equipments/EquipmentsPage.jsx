import { Suspense } from "react";
import { DUMMY_EQUIPMENTS } from "../../dummy_data/dummy_equipments";
import FallbackText from "../../components/FallbackText.jsx";
import { Await, json, useRouteLoaderData } from "react-router-dom";
import EquipmentsList from "./EquipmentsList";
import { fetchFun, fetchFunction, getToken } from "../../hooks/http.js";

export default function EquipmentsPage() {
  const equipmentsLoader = useRouteLoaderData("equipments-page-id");
  return (
    <section className="bg-gray-100 px-5   py-4">
      <h1 className="text-4xl text-black">Equipments</h1>
      <Suspense fallback={<FallbackText title="Fetching equipments data..." />}>
        <Await resolve={equipmentsLoader}>
          {(resolvedData) => <EquipmentsList data={resolvedData} />}
        </Await>
      </Suspense>
    </section>
  );
}

export function loader() {
  const token = getToken();
  return fetchFun({
    url: "http://localhost:8081/equipments",
    options: {
      method: "GET",
      headers: { "x-access-token": token },
    },
  });
}

function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_EQUIPMENTS);
    }, 3000);
  });
}
export async function action() {
  await timeOut();
  return null;
}
