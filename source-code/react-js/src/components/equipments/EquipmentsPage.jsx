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
        {(resolvedData) => {
          console.log(resolvedData);
          return <EquipmentsList data={resolvedData} />;
        }}
      </Await>
    </Suspense>
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
      resolve(DUMMY_EQUIPMENTS);
    }, 3000);
  });
}
