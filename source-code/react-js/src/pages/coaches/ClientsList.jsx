import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ClientsList({ clients }) {
  if (!clients || clients.length === 0) {
    return (
      <div className="mt-4 bg-white px-6 py-4 shadow-md mx-2">
        <p className="text-stone-500 text-center font-bold text-xl">
          No clients found!
        </p>
      </div>
    );
  }
  return (
    <ul
      className="mt-30 grid gap-5 rounded-md pb-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 350px))" }}
    >
      {clients.map((client) => (
        <ClientCard key={client.member_id} client={client} />
      ))}
    </ul>
  );
}

function ClientCard({ client }) {
  console.log(client)
  return (
    <li className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        <img
          className="object-cover flex w-full h-full"
          src="https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg"
          alt="Coach"
        />
      </div>
      <div className="mt-2 px-5 pb-5">
        <Link to={`/coaching/${client.member_id}`}>
          <h5 className="text-xl tracking-tight text-slate-900 mb-2 text-center">
            {client.name}
          </h5>
          <h5 className="text-xl tracking-tight text-slate-900 mb-2 text-center">
            {client.email}
          </h5>
        </Link>

        <Link
          to={`/coaching/${client.member_id}`}
          className="flex items-center justify-center rounded-md bg-blue-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Contact <ChevronRightIcon className="ml-2 h-6 w-6" />
        </Link>
      </div>
    </li>
  );
}
