import { Suspense } from "react";
import { DUMMY_EQUIPMENTS } from "../../dummy_data/dummy_equipments";
import FallbackText from "../../components/FallbackText.jsx";
import { Await, json, useRouteLoaderData } from "react-router-dom";
import EquipmentsList from "./EquipmentsList";
import { fetchFun, fetchFunction, getToken } from "../../hooks/http.js";

export default function EquipmentsPage() {
  const equipmentsLoader = useRouteLoaderData("equipments-page-id");
  return (
    <Suspense fallback={<FallbackText title="Fetching available equipments" />}>
      <Await resolve={equipmentsLoader}>
        {(resolvedData) => <EquipmentsList data={resolvedData} />}
      </Await>
    </Suspense>
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
