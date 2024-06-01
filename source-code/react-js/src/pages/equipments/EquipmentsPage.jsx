import FallbackText from "../../components/FallbackText.jsx";
import EquipmentsList from "./EquipmentsList";
import { fetchFun, getToken } from "../../hooks/http.js";
import { useQuery } from "@tanstack/react-query";

export default function EquipmentsPage() {
  const { data: equipmentsLoader, isPending } = useQuery({
    queryKey: ["equipments"],
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/equipments",
        options: {
          method: "GET",
          headers: { "x-access-token": getToken() },
        },
      }),
  });
  return (
    <section className="bg-gray-100 px-5   py-4">
      <h1 className="text-4xl text-black">Equipments</h1>
      {isPending ? (
        <FallbackText title="Fetching equipments data..." />
      ) : (
        <EquipmentsList data={equipmentsLoader} />
      )}
    </section>
  );
}


