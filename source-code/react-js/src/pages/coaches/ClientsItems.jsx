import ClientsList from "./ClientsList.jsx";
import { Link } from "react-router-dom";

export default function ClientsItems({ data: clients }) {
  return <ClientsList clients={clients} />;
}
