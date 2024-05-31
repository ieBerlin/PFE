import FallbackText from "../../components/FallbackText.jsx";
import EquipmentsTable from "./EquipmentsTable.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ForbiddenPage from "../../components/ForbiddenPage.jsx";
export default function EquipmentsBookings() {
  const userRole = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "admin"
  );

  if (!userRole) {
   return <ForbiddenPage title=" Access Denied: Admins Only" message="You do not have the necessary permissions to view this area. Admin access is required."/>
  }
  const { data, isPending } = useQuery({
    queryKey: ["equipments", "bookings"],
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/booking",
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
  });
  if (isPending) {
    return <FallbackText title="Fetching Available equipments bookings" />;
  }
  return (
    <div>
      <main className="bg-gray-50 w-full px-5 pt-4 pb-10">
        <EquipmentsTable data={data} />
      </main>
    </div>
  );
}


