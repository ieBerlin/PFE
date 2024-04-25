import { Suspense } from "react";
import { DUMMY_EQUIPMENTS } from "../../dummy_data/dummy_equipments";
import FallbackText from "../FallbackText.jsx";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import EquipmentsList from "./EquipmentsList";

export default function EquipmentsPage() {
  const { timeOut: timeOutLoader } = useRouteLoaderData("equipments-page-id");
  return (
    <Suspense fallback={<FallbackText title="Fetching available equipments" />}>
      <Await resolve={timeOutLoader}>
        {(resolvedData) => <EquipmentsList data={resolvedData} />}
      </Await>
    </Suspense>
  );
}
function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_EQUIPMENTS);
    }, 500);
  });
}
export function laoder() {
  return defer({
    timeOut: timeOut(),
  });
}
