import ClientsList from "./ClientsList.jsx";
import { Link } from "react-router-dom";

export default function ClientsItems({ data: clients }) {
  return (
    <div className="bg-white rounded-md px-3 py-4">
      <div className="w-full flex justify-end ">
        <Link
          className=" bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
          to="requets"
        >
          Clients Requests
        </Link>
      </div>
      <div className="flex flex-row w-full px-4 pt-2 mt-3 justify-between items-center">
        <div />
      </div>
      <ClientsList clients={clients} />
    </div>
  );
}
