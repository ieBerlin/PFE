import { useState } from "react";
import FilterDropdown from "../../components/FilterDropdown";
import ClientsList from "./ClientsList.jsx";
const selectedClients = {
  // status: {
  //   isActive: true,
  //   isExpired: false,
  // },
};

export default function ClientsItems({ data: clients }) {
  const [currentSelectedClients, setCurrentSelectedClients] =
    useState(selectedClients);

  // const filteredClients = filterClients(clients, currentSelectedClients);

  return (
    <div className="bg-white rounded-md">
      <div className="flex flex-row w-full px-4 pt-2 mt-3 justify-between items-center">
        <div />
        {/* <FilterDropdown
          currentSelectedData={currentSelectedClients}
          setData={setCurrentSelectedClients}
          filterOptionsData={[
            {
              title: "status",
              options: ["isActive", "isExpired"],
            },
          ]}
        /> */}
      </div>
      <ClientsList clients={clients} />
    </div>
  );
}
// export const filterClients = (clients, selectedCriteria) => {
//   return clients.filter((client) => {
//     const isConnected = selectedCriteria.status.isActive
//       ? client.status === "active"
//       : true;
//     const isExpired = selectedCriteria.status.isExpired
//       ? client.status === "expired"
//       : true;
//     return isConnected && isExpired;
//   });
// };
